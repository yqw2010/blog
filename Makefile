.PHONY: r d b h n run backup deploy help new

DRAFTS = ./blog/src/_drafts/
POSTS = ./blog/src/_posts/
LOCAL = http://0.0.0.0:4000/entry/
WEB = http://www.barretlee.com/entry/
TMP = ./blog/src/_tmp
BACKUPPOSTS = ./blogsources/backup/posts
BACKUPDRAFTS = ./blogsources/backup/drafts
BACKUPPOSTS_BAC = ./databackup/posts
BACKUPDRAFTS_BAC = ./databackup/drafts


r: run

d: deploy

b: backup

h: help

n: new

# 打开 hexo 本地服务
run:
	cd blog; \
	hexo g;\
	open ${LOCAL}; \
	hexo s;


deploy:
	# cp -rf ./databackup/* ${POSTS}; \
	cd blog; \
	rm -rf build/; \
	rm -rf .deploy*/; \
	hexo g; \
	hexo d; \
	open ${WEB};

backup:
	# 备份 posts
	@[ -d ${BACKUPPOSTS} ] || mkdir ${BACKUPPOSTS}; \
	cp -rf ${POSTS}* ${BACKUPPOSTS};
	# 二次备份 posts
	@[ -d ${BACKUPPOSTS_BAC} ] || mkdir ${BACKUPPOSTS_BAC}; \
	cp -rf ${POSTS}* ${BACKUPPOSTS_BAC};
	# 备份 drafts
	@[ -d ${BACKUPDRAFTS} ] || mkdir ${BACKUPDRAFTS}; \
	cp -rf ${DRAFTS}* ${BACKUPDRAFTS};
	# 二次备份 drafts
	@[ -d ${BACKUPDRAFTS_BAC} ] || mkdir ${BACKUPDRAFTS_BAC}; \
	cp -rf ${DRAFTS}* ${BACKUPDRAFTS_BAC};
ifneq (${P},)
	# 参数中包含 push, 推到仓库中去备份
	git add --all; \
	git commit -am "backup"; \
	git push origin master -f;
endif

new:
ifneq (${P},)
	@echo "'N' is must be a string";
else
ifneq (${N},)
	@[ -d ${TMP} ] || mkdir ${TMP}; \
	mv ${POSTS}* ${TMP}; \
	touch ${DRAFTS}${N}.md;
endif
endif

help:
	@echo "===============A common Makefilefor blog system==============";
	@echo "Copyright (C) 2015 barret.china@gmail.com";
	@echo "The following targets are support:";
	@echo;
	@echo " r --run              - start local serve at http://0.0.0.0:4000";
	@echo " d --deploy           - deploy project to gitcafe & github";
	@echo " b --backup           - backup dates";
	@echo " h --help             - show help info";
	@echo " n --new (N=postname) - write new page, fg: 'make new N=postname'";
	@echo;
	@echo "To make a target, do 'make [target]', short for 'make [t]'";
	@echo "========================= Version0.1 ========================"

