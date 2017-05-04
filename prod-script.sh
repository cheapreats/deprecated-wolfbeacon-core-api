git reset --soft HEAD~1
git stash
git pull --rebase upstream master
git stash apply
git add -A
git commit -m"Applied prod config"
git push -f origin master

