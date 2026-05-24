#!/usr/bin/env bash
set -euo pipefail

SKILLS_ROOT=".agents/skills"
OUTPUT_DIR="docs/inteligencia-artificial"
OUTPUT_FILE="$OUTPUT_DIR/skills.md"

if [ ! -d "$SKILLS_ROOT" ]; then
  rm -f "$OUTPUT_FILE"
  echo "No $SKILLS_ROOT directory found. Skills documentation was not generated."
  exit 0
fi

mapfile -t SKILL_FILES < <(
  find "$SKILLS_ROOT" \
    -path "*/SKILL.md" \
    -type f \
    -print | sort
)

if [ "${#SKILL_FILES[@]}" -eq 0 ]; then
  rm -f "$OUTPUT_FILE"
  echo "No SKILL.md files found under $SKILLS_ROOT. Skills documentation was not generated."
  exit 0
fi

mkdir -p "$OUTPUT_DIR"

extract_frontmatter_value() {
  local file="$1"
  local key="$2"

  awk -v key="$key" '
    BEGIN { in_frontmatter = 0 }
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter && $0 == "---" { exit }
    in_frontmatter && $0 ~ "^" key ":" {
      sub("^" key ":[[:space:]]*", "")
      gsub(/^\"|\"$/, "")
      gsub(/^\047|\047$/, "")
      print
      exit
    }
  ' "$file"
}

cat > "$OUTPUT_FILE" <<'EOF'
---
layout: default
title: Skills
parent: Inteligencia Artificial
nav_order: 10
---

# Skills

Esta página se genera automáticamente durante el despliegue de GitHub Pages a partir de los archivos `.agents/skills/*/SKILL.md`.

| Skill | Descripción |
| :--- | :--- |
EOF

for file in "${SKILL_FILES[@]}"; do
  skill_dir="$(basename "$(dirname "$file")")"

  name="$(extract_frontmatter_value "$file" "name")"
  description="$(extract_frontmatter_value "$file" "description")"

  if [ -z "$name" ]; then
    name="$(grep -m 1 '^# ' "$file" | sed 's/^# //' || true)"
  fi

  if [ -z "$name" ]; then
    name="$skill_dir"
  fi

  if [ -z "$description" ]; then
    description="Sin descripción declarada."
  fi

  name="${name//|/\\|}"
  description="${description//|/\\|}"

  printf '| **%s** | %s |\n' "$name" "$description" >> "$OUTPUT_FILE"
done

echo "Generated $OUTPUT_FILE with ${#SKILL_FILES[@]} skill(s)."
