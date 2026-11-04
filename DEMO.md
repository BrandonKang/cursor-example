# Worktree deploy demo — 5 versions

## Layout

```
~/Desktop/cursor_projects/
├── cursor-training/         ← main (template; port 3000)
├── cursor-training-v1/      ← deploy/v1 · v1.0.0 · :3101
├── cursor-training-v2/      ← deploy/v2 · v2.0.0 · :3102
├── cursor-training-v3/      ← deploy/v3 · v3.0.0 · :3103
├── cursor-training-v4/      ← deploy/v4 · v4.0.0 · :3104
└── cursor-training-v5/      ← deploy/v5 · v5.0.0 · :3105
```

Each worktree’s `deploy.json` sets `version` + `port`. `npm start` runs a tiny HTTP server.

## Curl all five

```bash
for p in 3101 3102 3103 3104 3105; do
  echo "=== :$p ==="
  curl -s "http://127.0.0.1:$p/"
done
```

## Stop deployments

PIDs are written under `/tmp/cursor-training-deploys/` when started via the demo script.

```bash
# If you used the start helper:
kill $(cat /tmp/cursor-training-deploys/*.pid) 2>/dev/null

# Or by port:
for p in 3101 3102 3103 3104 3105; do
  lsof -ti tcp:$p | xargs kill 2>/dev/null
done
```

## List / remove worktrees

```bash
cd /Users/sakang/Desktop/cursor_projects/cursor-training
git worktree list

# Example remove one:
# git worktree remove ../cursor-training-v1
```

## Recreate one worktree

```bash
cd /Users/sakang/Desktop/cursor_projects/cursor-training
git worktree add ../cursor-training-v1 -b deploy/v1
cd ../cursor-training-v1
# edit deploy.json → version v1.0.0, port 3101
npm start
```
