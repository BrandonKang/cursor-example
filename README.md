# Cursor Training · worktree deploy demo

One git repo, many worktrees — each **version** serves HTTP on its **own port**.

## Quick start (main template)

```bash
cd ~/Desktop/cursor_projects/cursor-training
npm start
# → http://127.0.0.1:3000/  (v0.0.0-main)
```

## Five deployments

| Path | Branch | Version | Port |
|------|--------|---------|------|
| `../cursor-training-v1` | `deploy/v1` | `v1.0.0` | 3001 |
| `../cursor-training-v2` | `deploy/v2` | `v2.0.0` | 3002 |
| `../cursor-training-v3` | `deploy/v3` | `v3.0.0` | 3003 |
| `../cursor-training-v4` | `deploy/v4` | `v4.0.0` | 3004 |
| `../cursor-training-v5` | `deploy/v5` | `v5.0.0` | 3005 |

```bash
curl -s http://127.0.0.1:3001/   # → "version": "v1.0.0"
```

Config lives in each worktree’s `deploy.json` (`version` + `port`). See **[DEMO.md](./DEMO.md)** for stop / remove commands.
