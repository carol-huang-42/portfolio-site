const base = () => `${import.meta.env.BASE_URL}projects/aigc-team/`;

/** 首页项目卡片 → public/projects/aigc-team/project-cover.png */
export const aigcProjectCoverSrc = () => `${base()}project-cover.png`;

/** 详情页 Hero「网站预览」→ public/projects/aigc-team/site-preview.png */
export const aigcSitePreviewSrc = () => `${base()}site-preview.png`;

export const aigcCaseProjectContentSrc = () => `${base()}case-project-content.png`;
export const aigcCaseKeyGenPlatformSrc = () => `${base()}case-key-gen-platform.png`;
/** 关键界面 · 腾讯合作移动端 → case-key1-gen-platform.png */
export const aigcCaseKeyOutsourcedMobileSrc = () => `${base()}case-key1-gen-platform.png`;

/** Tab「移动端项目」→ public/projects/aigc-team/case-mobile-ssv.png */
export const aigcCaseMobileSsvSrc = () => `${base()}case-mobile-ssv.png`;

/** Tab「移动端项目」→ public/projects/aigc-team/case-mobile-tencent-game.png */
export const aigcCaseMobileTencentGameSrc = () => `${base()}case-mobile-tencent-game.png`;
