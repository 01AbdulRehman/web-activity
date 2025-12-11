# Git Workflow & Collaboration Guide

This document demonstrates the complete Git workflow used in the Blog Platform project.

## Repository Structure

```
master (main production branch)
├── Commits: Stable releases only
└── Tags: v1.0.0, v1.1.0, etc.

develop (integration branch)
├── Commits: Integration of features
└── Feature branches merge here

feature/add-post-validation (feature branch)
├── Commit: feat(backend): add input validation middleware
└── Merges back to develop

feature/improve-ui (feature branch)
├── Commits: UI enhancements
└── Merges back to develop
```

## Current Branches

The repository currently has the following branches:

- **master**: Main production branch (1 commit)
- **develop**: Development/integration branch
- **feature/add-post-validation**: Feature branch for input validation (1 new commit)
- **feature/improve-ui**: Feature branch for UI improvements

## Commits Made

### Initial Commit
```
commit 075d694
initial: Full-stack blog platform with Docker

- Complete project structure
- Backend, frontend, and database services
- Dockerfiles and docker-compose configuration
- GitHub templates and workflows
- Comprehensive documentation
```

### Feature Commit (feature/add-post-validation)
```
commit 8d913c7
feat(backend): add input validation middleware

- Create validators.js with post validation functions
- Validate title: 3-200 characters
- Validate content: 10-10000 characters
- Sanitize inputs to prevent injection attacks
- Support partial updates with validatePostUpdate
```

## Branching Strategy

The project follows the **Git Flow** branching strategy:

### 1. Feature Development
```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat(scope): description"

# Push to origin
git push -u origin feature/feature-name
```

### 2. Create Pull Request
- Go to GitHub
- Create PR from `feature/feature-name` → `develop`
- Add description and request reviewers
- Discuss changes with team

### 3. Code Review
- Team members review code
- Request changes if needed
- Developer updates branch as needed

### 4. Merge to Develop
```bash
# After approval, merge (squash recommended)
git checkout develop
git pull origin develop
git merge --squash feature/feature-name
git commit -m "Merge feature/feature-name"
git push origin develop
```

### 5. Release to Main
```bash
# Create release branch
git checkout -b release/v1.0.0

# Update version numbers
git commit -am "chore: bump version to 1.0.0"
git push -u origin release/v1.0.0

# Create PR to main, merge after review
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main v1.0.0
```

## Common Git Commands

### Viewing History
```bash
# View commit history
git log --oneline -n 10

# View detailed history with graph
git log --graph --decorate --all --oneline

# View changes in specific file
git log -p backend/server.js
```

### Working with Branches
```bash
# List local branches
git branch -a

# List branches with last commit
git branch -v

# Track remote branch
git checkout --track origin/feature/feature-name

# Delete local branch
git branch -d feature/feature-name

# Delete remote branch
git push origin --delete feature/feature-name
```

### Making Changes
```bash
# Stage specific files
git add backend/server.js frontend/App.js

# Stage all changes
git add .

# View staged changes
git diff --staged

# Commit
git commit -m "commit message"

# Amend last commit (only if not pushed)
git commit --amend --no-edit

# Push to remote
git push origin feature/feature-name
```

### Undoing Changes
```bash
# Undo working directory changes
git checkout -- filename

# Unstage file
git reset HEAD filename

# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (safe, creates new commit)
git revert abc123
```

### Syncing with Remote
```bash
# Fetch latest changes
git fetch origin

# Pull (fetch + merge)
git pull origin develop

# Pull with rebase
git pull --rebase origin develop

# Push changes
git push origin feature/feature-name
```

## Commit Message Conventions

Format: `type(scope): subject`

```
type: feat, fix, docs, style, refactor, perf, test, chore
scope: backend, frontend, docker, ci, docs
subject: concise description (50 chars max)

Optional body:
More detailed explanation of changes
```

### Examples

✅ Good commit messages:
```
feat(backend): add input validation middleware
fix(frontend): correct API endpoint URL
docs: update README with deployment instructions
refactor(backend): reorganize database queries
```

❌ Bad commit messages:
```
update stuff
fixed it
changes
working now
```

## Merge Strategies

### 1. Regular Merge (Preserves history)
```bash
git merge feature/feature-name
```

### 2. Squash Merge (Combines commits)
```bash
git merge --squash feature/feature-name
git commit -m "Merge feature/feature-name"
```

### 3. Rebase (Cleaner history)
```bash
git rebase origin/develop
git push --force-with-lease origin feature/feature-name
```

## Handling Conflicts

```bash
# During merge or rebase, conflicts may occur
# 1. Open conflicted files and look for markers:
#    <<<<<<< HEAD
#    your changes
#    =======
#    their changes
#    >>>>>>> branch-name

# 2. Resolve the conflicts manually

# 3. Stage resolved files
git add resolved-file.js

# 4. Complete the merge/rebase
git merge --continue  # or git rebase --continue

# 5. Push the resolved branch
git push origin branch-name
```

## Best Practices

1. **Commit Often**: Make small, logical commits
2. **Write Good Messages**: Clear, descriptive commit messages
3. **Keep Branches Short-lived**: Merge within 1-2 days if possible
4. **Pull Before Push**: Always sync with remote before pushing
5. **Code Review**: Use PRs for all changes (except hotfixes)
6. **Test Before Committing**: Ensure tests pass locally
7. **Don't Commit Secrets**: Use .gitignore and environment variables
8. **Use Tags for Releases**: Tag release commits with version numbers

## GitHub Workflow Integration

### GitHub Features Used

1. **Pull Requests**
   - Code review mechanism
   - Automated checks (tests, linting)
   - Discussion on changes

2. **Issues**
   - Bug reports
   - Feature requests
   - Task tracking

3. **Projects**
   - Kanban-style task management
   - Track project progress

4. **Discussions**
   - Team conversations
   - Knowledge base

5. **Actions (CI/CD)**
   - Automated testing
   - Docker image building and pushing
   - Deployment workflows

### Setting up GitHub for Collaboration

```bash
# 1. Create repository on GitHub
# Go to github.com/new

# 2. Add remote to local repo
git remote add origin https://github.com/yourusername/blog-platform.git

# 3. Rename branch to main
git branch -M main

# 4. Push initial commit
git push -u origin main

# 5. Create develop branch on GitHub
git push -u origin develop

# 6. Clone for team members
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform
git checkout develop  # Work from develop
```

## Collaboration Workflow Example

### Scenario: Team member adds new feature

**Developer A:**
```bash
# 1. Get latest code
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/add-comments

# 3. Make changes
# ... edit files ...

# 4. Commit
git add .
git commit -m "feat(backend): add comment endpoints"

# 5. Push to GitHub
git push -u origin feature/add-comments
```

**GitHub:**
- Developer A opens Pull Request
- Describes changes and links related issues

**Developer B:**
```bash
# 1. Fetch latest
git fetch origin

# 2. Review PR on GitHub
# - Adds comments
# - Requests changes

# 3. Developer A updates based on feedback
# Developer A's terminal:
git add .
git commit -m "fix: address review feedback"
git push origin feature/add-comments
```

**Developer B (continued):**
```bash
# 4. Approve PR
# Click "Approve" on GitHub
```

**Developer A:**
```bash
# 5. Merge after approval
# Click "Squash and merge" on GitHub
```

**All developers:**
```bash
# 6. Get the merged code
git fetch origin
git checkout develop
git pull origin develop
```

## Tips for Success

1. **Regular Syncing**: Pull from develop regularly to avoid conflicts
2. **Atomic Commits**: Each commit should represent one logical change
3. **Feature Flags**: Use feature flags for large features
4. **Peer Review**: Always have someone review your code
5. **Automated Tests**: Rely on CI/CD to catch issues early
6. **Documentation**: Update docs when changing functionality

---

For more information, see the main [README.md](../README.md) and [CONTRIBUTING.md](../CONTRIBUTING.md) files.
