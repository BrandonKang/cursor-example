# Cursor Training · git worktree demo

A tiny Node app that shows **which git checkout** you're in (branch + path). Use it to feel how worktrees give you two (or more) working directories for one repo.

## Layout

```
~/Desktop/cursor_projects/
├── cursor-training/              ← main worktree (branch: main)
└── cursor-training-feature/      ← linked worktree (branch: feature/label-change)
```

Both folders share one `.git` history. You can open each folder in Cursor as its own window.

## Run

```bash
cd ~/Desktop/cursor_projects/cursor-training
npm start

cd ~/Desktop/cursor_projects/cursor-training-feature
npm start
```

Each run prints `label`, `branch`, and absolute `root`.

## Worktrees in 30 seconds

| Command | What it does |
|--------|----------------|
| `git worktree list` | Show all checkouts for this repo |
| `git worktree add ../cursor-training-feature -b feature/label-change` | New folder + new branch |
| `git worktree remove ../cursor-training-feature` | Delete the linked checkout (after you're done) |

See **[DEMO.md](./DEMO.md)** for the full recreate / cleanup recipe.
