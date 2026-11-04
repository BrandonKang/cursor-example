# Worktree demo — recreate & cleanup

Assumes the project lives at:

`/Users/sakang/Desktop/cursor_projects/cursor-training`

## Recreate (from scratch)

```bash
cd /Users/sakang/Desktop/cursor_projects/cursor-training

# 1. Repo already has commits on main. Create a sibling worktree + branch:
git worktree add ../cursor-training-feature -b feature/label-change

# 2. In the feature worktree, change the label and commit:
cd ../cursor-training-feature
echo "feature checkout" > checkout-label.txt
git add checkout-label.txt
git commit -m "feat: distinguish feature worktree label"

# 3. List worktrees (from either folder):
git worktree list

# 4. Run the demo in both checkouts:
cd /Users/sakang/Desktop/cursor_projects/cursor-training
npm start

cd /Users/sakang/Desktop/cursor_projects/cursor-training-feature
npm start
```

## Useful checks

```bash
# From main worktree
cd /Users/sakang/Desktop/cursor_projects/cursor-training
git worktree list
git status
git branch -vv

# From feature worktree
cd /Users/sakang/Desktop/cursor_projects/cursor-training-feature
git status
git log -1 --oneline
```

## Remove the worktree when done

```bash
cd /Users/sakang/Desktop/cursor_projects/cursor-training

# Preferred: let git remove the linked directory
git worktree remove ../cursor-training-feature

# If the folder was deleted manually:
# git worktree prune

# Optional: delete the feature branch after merge/discard
# git branch -d feature/label-change
```

## Optional: link private GitHub remote

```bash
cd /Users/sakang/Desktop/cursor_projects/cursor-training
git remote add origin https://github.com/BrandonKang/cursor-example.git
# Do not push until you intend to; .env.local is gitignored.
```
