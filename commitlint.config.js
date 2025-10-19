/*
 * @Author: majialu-love-zouyutong majialu0220@gmail.com
 * @Date: 2025-10-19 22:39:14
 * @LastEditors: majialu-love-zouyutong majialu0220@gmail.com
 * @LastEditTime: 2025-10-20 00:17:29
 * @FilePath: \study-island\commitlint.config.js
 * @Description: Commitlint 配置文件 - 用于规范 Git 提交信息格式
 *
 * Copyright (c) 2025 by majialu0220@gmail.com All Rights Reserved.
 */

/** @type {import('cz-git').UserConfig} */
export default {
  // 继承 commitlint 的常见规范（Angular 风格）
  extends: ["@commitlint/config-conventional"],

  // commitlint 规则（影响 commit message 校验）
  rules: {
    // 提交主体前必须有空行（body 与 header 之间），严重级别 2（错误）
    "body-leading-blank": [2, "always"],

    // footer 前是否需要空行
    "footer-leading-blank": [1, "always"],

    // header 最大长度
    "header-max-length": [2, "always", 108],

    // 不允许空的 subject
    "subject-empty": [2, "never"],

    // 不允许空的 type
    "type-empty": [2, "never"],

    // 对 subject 的大小写不做强制
    "subject-case": [0],

    // type 的可选值
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
        "workflow",
        "types",
        "release",
      ],
    ],
  },

  // 自定义错误提示信息（中文）
  plugins: [
    {
      rules: {
        "subject-empty": ({ subject }) => {
          const isValid = subject && subject.trim().length > 0;
          return [
            isValid,
            "❌ 提交描述不能为空！\n💡 请在冒号后添加描述，例如: feat: 添加用户登录功能",
          ];
        },
        "type-empty": ({ type }) => {
          const isValid = type && type.trim().length > 0;
          return [
            isValid,
            "❌ 提交类型不能为空！\n💡 格式: <类型>: <描述>\n📚 可用类型: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, wip, workflow, types, release",
          ];
        },
        "type-enum": ({ type }) => {
          const validTypes = [
            "feat",
            "fix",
            "docs",
            "style",
            "refactor",
            "perf",
            "test",
            "build",
            "ci",
            "chore",
            "revert",
            "wip",
            "workflow",
            "types",
            "release",
          ];
          const isValid = validTypes.includes(type);
          return [
            isValid,
            `❌ 提交类型 "${type}" 不在允许的范围内！
            💡 请使用以下类型之一:
              ✨ feat      - 新功能
              🐛 fix       - 修复bug
              📚 docs      - 文档变更
              🎨 style     - 代码格式
              📦 refactor  - 代码重构
              🚀 perf      - 性能优化
              🧪 test      - 测试相关
              🏗️  build     - 构建/依赖变更
              👷 ci        - 持续集成
              🔧 chore     - 其他修改
              ⏪ revert    - 回滚提交
              🚧 wip       - 进行中的工作
              🔁 workflow  - 工作流相关
              🔤 types     - 类型定义
              🏷️  release   - 版本发布`,
          ];
        },
        "header-max-length": ({ header }) => {
          const maxLength = 108;
          const isValid = header.length <= maxLength;
          return [
            isValid,
            `❌ 提交信息头部太长了！
📏 当前长度: ${header.length} 字符
📏 最大长度: ${maxLength} 字符
💡 请精简描述，保持简洁明了`,
          ];
        },
        "body-leading-blank": ({ body }) => {
          if (!body) return [true];
          const isValid = body.startsWith("\n");
          return [
            isValid,
            "❌ 提交正文前需要有空行！\n💡 在标题和正文之间添加一个空行",
          ];
        },
        "footer-leading-blank": ({ footer }) => {
          if (!footer) return [true];
          const isValid = footer.startsWith("\n");
          return [
            isValid,
            "⚠️  页脚前建议有空行！\n💡 在正文和页脚之间添加一个空行",
          ];
        },
        "subject-case": ({ subject }) => {
          // 这个规则已关闭，但保留提示以供参考
          return [true];
        },
      },
    },
  ],

  // 自定义帮助信息 URL 或提示文本
  helpUrl: `请使用 pnpm commit 命令进行交互式提交，不要直接使用 git commit 命令`,

  // cz-git 的 prompt 配置（交互式提交时的提示）
  prompt: {
    // types 与上面的 type-enum 必须一致
    types: [
      {
        value: "feat",
        name: "✨ feat:       新功能（feature）",
        emoji: "✨",
      },
      {
        value: "fix",
        name: "🐛 fix:        修复 bug",
        emoji: "🐛",
      },
      {
        value: "docs",
        name: "📚 docs:       文档变更",
        emoji: "📚",
      },
      {
        value: "style",
        name: "🎨 style:      代码格式（不影响逻辑）",
        emoji: "🎨",
      },
      {
        value: "refactor",
        name: "📦 refactor:   代码重构（无新增/修复）",
        emoji: "📦",
      },
      {
        value: "perf",
        name: "🚀 perf:       性能优化",
        emoji: "🚀",
      },
      {
        value: "test",
        name: "🧪 test:       测试相关",
        emoji: "🧪",
      },
      {
        value: "build",
        name: "🏗️  build:      构建系统/外部依赖变更",
        emoji: "🏗️",
      },
      {
        value: "ci",
        name: "👷 ci:         持续集成/流程相关",
        emoji: "👷",
      },
      {
        value: "chore",
        name: "🔧 chore:      构建过程或辅助工具变更",
        emoji: "🔧",
      },
      {
        value: "revert",
        name: "⏪ revert:     回滚到以前的提交",
        emoji: "⏪",
      },
      {
        value: "wip",
        name: "🚧 wip:        正在进行的工作（未完成）",
        emoji: "🚧",
      },
      {
        value: "workflow",
        name: "🔁 workflow:   工作流（如 GitHub Actions）",
        emoji: "🔁",
      },
      {
        value: "types",
        name: "🔤 types:      类型定义文件/TS 类型相关",
        emoji: "🔤",
      },
      {
        value: "release",
        name: "🏷️  release:    发布/版本相关",
        emoji: "🏷️",
      },
    ],

    // 影响范围，常见子项目/包名
    scopes: [
      { value: "root", name: "root:     项目根目录" },
      { value: "backend", name: "backend:  后端相关" },
      { value: "mobile", name: "mobile:   移动端相关" },
      { value: "pc", name: "pc:       PC端相关" },
    ],
    allowCustomScopes: true,
    allowEmptyScopes: true,

    // 跳过不必要的问题
    skipQuestions: ["body", "breaking", "footerPrefix", "footer"],

    // 提示文本（中文提示更友好）
    messages: {
      type: "📌 选择你要提交的类型:",
      scope: "🎯 选择一个影响范围 (可选，直接回车跳过):",
      customScope: "🎯 请输入自定义的影响范围:",
      subject: "📝 填写简短精炼的变更描述:\n   (例如: 添加用户登录功能)\n",
      body: '🔍 填写更详细的变更描述 (可选)。使用 "|" 换行:\n',
      breaking: "💥 列举非兼容性重大的变更 (可选):\n",
      footerPrefixesSelect: "🔗 选择关联issue前缀 (可选):",
      customFooterPrefix: "🔗 输入自定义issue前缀:",
      footer: "🔗 列举关联的 ISSUE (可选)。例如: #31, #34:\n",
      generatingByAI: "🤖 正在通过 AI 生成你的提交简短描述...",
      generatedSelectByAI: "💡 选择一个 AI 生成的简短描述:",
      confirmCommit: "✅ 是否确认以上commit信息提交？",
    },

    // 允许在 feat 和 fix 类型中添加 breaking changes
    allowBreakingChanges: ["feat", "fix"],

    // subject 长度限制
    subjectLimit: 100,

    // 默认 scope 枚举分隔符
    scopeEnumSeparator: ",",

    // 自定义选择框宽度
    maxHeaderLength: 108,
    maxSubjectLength: 100,
    minSubjectLength: 3,

    // 默认 body 和 footer 的最大长度
    defaultBody: "",
    defaultFooter: "",

    // 是否使用 emoji（建议开启，让提交历史更直观）
    useEmoji: true,
    emojiAlign: "center",

    // 主题前缀（可选，如果不想要可以设为空）
    themeColorCode: "",

    // 如果有 AI 生成功能可以配置（需要额外插件支持）
    // aiNumber: 3,
    // aiQuestionCB: ({ answers, aiQuestions }) => { }
  },
};
