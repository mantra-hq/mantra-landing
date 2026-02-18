import { useI18n } from '../../lib/i18n';

export function TimeTravelVisual() {
  const { lang } = useI18n();

  const conversations = [
    {
      time: '10:32',
      role: 'AI',
      avatar: 'M',
      isAI: true,
      text: lang === 'zh' ? '好的，我来添加 JWT 验证中间件…' : 'OK, adding JWT auth middleware…',
    },
    {
      time: '10:28',
      role: lang === 'zh' ? '你' : 'You',
      avatar: 'Y',
      isAI: false,
      text: lang === 'zh' ? '把 auth 重构一下，分离 middleware' : 'Refactor auth, split middleware',
    },
    {
      time: '10:15',
      role: 'AI',
      avatar: 'M',
      isAI: true,
      text: lang === 'zh' ? '实现基础登录接口，用户名密码验证…' : 'Implementing basic login endpoint…',
    },
    {
      time: '09:45',
      role: 'AI',
      avatar: 'M',
      isAI: true,
      text: lang === 'zh' ? '初始化项目结构，创建 auth 模块…' : 'Init project structure, auth module…',
    },
  ];

  const diffLines = [
    { type: 'context', text: "const express = require('express');" },
    { type: 'remove', text: "const basicAuth = require('./basic');" },
    { type: 'add', text: "const jwt = require('jsonwebtoken');" },
    { type: 'add', text: 'const verifyToken = (req, res, next) => {' },
    { type: 'add', text: "  const token = req.headers['authorization'];" },
    { type: 'context', text: '  // ...' },
  ];

  const panelTitle = lang === 'zh' ? '对话记录' : 'Conversations';
  const timelineLabel = lang === 'zh' ? '4 条消息' : '4 messages';

  return (
    <div className="glass-dark rounded-2xl overflow-hidden glow-secondary">
      {/* Window title bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-sm text-gray-500 font-mono">session: auth-module</span>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/5">
        {/* Left: Conversation list */}
        <div className="sm:w-2/5 p-3">
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
            {panelTitle}
          </div>
          <div className="space-y-1">
            {conversations.map((conv, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 px-2 py-1.5 rounded-md transition-colors ${
                  idx === 0
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                    conv.isAI
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-primary/20 text-primary'
                  }`}
                >
                  {conv.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-gray-300">
                      {conv.role}
                    </span>
                    <span className="text-[10px] text-gray-600">{conv.time}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">
                    {conv.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code diff */}
        <div className="sm:w-3/5 p-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-mono text-gray-400">
              auth/middleware.js
            </span>
            <span className="text-[10px] text-gray-600">@ 10:28</span>
          </div>
          <div className="rounded-lg bg-dark-300/60 p-2.5 font-mono text-[11px] leading-relaxed space-y-0.5">
            {diffLines.map((line, idx) => {
              let prefix = ' ';
              let colorClass = 'text-gray-500';
              let bgClass = '';
              if (line.type === 'add') {
                prefix = '+';
                colorClass = 'text-green-400';
                bgClass = 'bg-[var(--diff-add)]';
              } else if (line.type === 'remove') {
                prefix = '-';
                colorClass = 'text-red-400';
                bgClass = 'bg-[var(--diff-remove)]';
              }
              return (
                <div
                  key={idx}
                  className={`px-1.5 py-px rounded-sm ${bgClass}`}
                >
                  <span className={`${colorClass} select-none`}>
                    {prefix}{' '}
                  </span>
                  <span className={line.type === 'context' ? 'text-gray-500' : colorClass}>
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: Timeline bar */}
      <div className="px-4 py-3 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative h-2">
            <div className="absolute inset-0 bg-dark-200 rounded-full" />
            <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-secondary/70 to-primary/70 rounded-full" />
            {/* Keyframe dots */}
            {[10, 33, 58, 85].map((pos, idx) => (
              <div
                key={idx}
                className={`absolute top-1/2 -translate-y-1/2 rounded-full border-2 transition-all ${
                  idx === 2
                    ? 'w-3.5 h-3.5 bg-white border-primary shadow-lg shadow-primary/30'
                    : 'w-2.5 h-2.5 bg-dark-100 border-gray-600'
                }`}
                style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 shrink-0">
            {timelineLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
