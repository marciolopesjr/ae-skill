#!/usr/bin/env bash
set -euo pipefail

COMPOSITION="${COMPOSITION:-MasterShowcase}"
FPS="${FPS:-30}"
OUTPUT="${OUTPUT:-out/${COMPOSITION}-intel-vaapi.mp4}"
VAAPI_QP="${VAAPI_QP:-20}"
VAAPI_DEVICE="${VAAPI_DEVICE:-/dev/dri/renderD128}"
REMOTION_GL="${REMOTION_GL:-angle-egl}"
KEEP_FRAMES="${KEEP_FRAMES:-0}"
INCLUDE_AUDIO="${INCLUDE_AUDIO:-1}"

DEFAULT_RAM_FRAME_DIR="/dev/shm/remotion-vaapi-${COMPOSITION}"
DEFAULT_DISK_FRAME_DIR="out/intel-vaapi-frames-${COMPOSITION}"
DEFAULT_RAM_AUDIO_OUTPUT="/dev/shm/remotion-audio-${COMPOSITION}.aac"
DEFAULT_DISK_AUDIO_OUTPUT="out/${COMPOSITION}-mixed-audio.aac"

if [[ -z "${FRAME_DIR:-}" ]]; then
  if [[ -d /dev/shm && -w /dev/shm ]]; then
    FRAME_DIR="${DEFAULT_RAM_FRAME_DIR}"
  else
    FRAME_DIR="${DEFAULT_DISK_FRAME_DIR}"
  fi
fi

if [[ -z "${AUDIO_OUTPUT:-}" ]]; then
  if [[ -d /dev/shm && -w /dev/shm ]]; then
    AUDIO_OUTPUT="${DEFAULT_RAM_AUDIO_OUTPUT}"
  else
    AUDIO_OUTPUT="${DEFAULT_DISK_AUDIO_OUTPUT}"
  fi
fi

case "${FRAME_DIR}" in
  /dev/shm/remotion-vaapi-*|out/intel-vaapi-frames-*|out/validation-*|out/bench-*)
    rm -rf "${FRAME_DIR}"
    ;;
  *)
    echo "Refusing to delete unsafe FRAME_DIR: ${FRAME_DIR}" >&2
    echo "Use a path under /dev/shm/remotion-vaapi-* or out/intel-vaapi-frames-*." >&2
    exit 1
    ;;
esac

if [[ "${INCLUDE_AUDIO}" == "1" ]]; then
  case "${AUDIO_OUTPUT}" in
    /dev/shm/remotion-audio-*|out/*-mixed-audio.aac|out/audio-*.aac)
      rm -f "${AUDIO_OUTPUT}"
      ;;
    *)
      echo "Refusing to delete unsafe AUDIO_OUTPUT: ${AUDIO_OUTPUT}" >&2
      echo "Use /dev/shm/remotion-audio-* or out/*-mixed-audio.aac." >&2
      exit 1
      ;;
  esac
fi

mkdir -p "${FRAME_DIR}"
mkdir -p "$(dirname "${OUTPUT}")"
mkdir -p "$(dirname "${AUDIO_OUTPUT}")"

npx remotion render "${COMPOSITION}" "${FRAME_DIR}" \
  --sequence \
  --image-format=png \
  --chrome-mode=chrome-for-testing \
  --gl="${REMOTION_GL}" \
  --log=verbose \
  --muted

FIRST_FRAME="$(find "${FRAME_DIR}" -maxdepth 1 -type f \( -name '*.png' -o -name '*.jpeg' -o -name '*.jpg' \) | sort | head -n 1)"

if [[ -z "${FIRST_FRAME}" ]]; then
  echo "No rendered image frames found in ${FRAME_DIR}" >&2
  exit 1
fi

FRAME_EXTENSION="${FIRST_FRAME##*.}"
FIRST_FRAME_NAME="$(basename "${FIRST_FRAME}")"
FIRST_FRAME_INDEX="${FIRST_FRAME_NAME#element-}"
FIRST_FRAME_INDEX="${FIRST_FRAME_INDEX%."${FRAME_EXTENSION}"}"
FRAME_PADDING="${#FIRST_FRAME_INDEX}"

VIDEO_ONLY_OUTPUT="${OUTPUT}"
if [[ "${INCLUDE_AUDIO}" == "1" ]]; then
  VIDEO_ONLY_OUTPUT="${OUTPUT%.*}.video-only.mp4"
fi

ffmpeg -hide_banner -y \
  -framerate "${FPS}" \
  -i "${FRAME_DIR}/element-%0${FRAME_PADDING}d.${FRAME_EXTENSION}" \
  -vaapi_device "${VAAPI_DEVICE}" \
  -vf "format=nv12,hwupload" \
  -c:v h264_vaapi \
  -rc_mode CQP \
  -qp "${VAAPI_QP}" \
  "${VIDEO_ONLY_OUTPUT}"

if [[ "${INCLUDE_AUDIO}" == "1" ]]; then
  if node scripts/render-audio.cjs "${COMPOSITION}" "${AUDIO_OUTPUT}"; then
    if [[ -s "${AUDIO_OUTPUT}" ]]; then
      ffmpeg -hide_banner -y \
        -i "${VIDEO_ONLY_OUTPUT}" \
        -i "${AUDIO_OUTPUT}" \
        -map 0:v:0 \
        -map 1:a:0 \
        -c:v copy \
        -c:a copy \
        -shortest \
        "${OUTPUT}"
      rm -f "${VIDEO_ONLY_OUTPUT}" "${AUDIO_OUTPUT}"
    else
      echo "Audio render produced no data; keeping video-only output." >&2
      mv "${VIDEO_ONLY_OUTPUT}" "${OUTPUT}"
    fi
  else
    echo "Audio render failed; keeping video-only output." >&2
    mv "${VIDEO_ONLY_OUTPUT}" "${OUTPUT}"
  fi
fi

if [[ "${KEEP_FRAMES}" != "1" ]]; then
  rm -rf "${FRAME_DIR}"
fi
