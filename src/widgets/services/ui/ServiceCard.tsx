'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { cn } from '@/shared/lib'
import type { Service } from '../types'

interface ServiceCardProps {
  service: Service
}

// Define code segments structure with smaller pieces
const codeSegments = [
  [
    { color: 'theme4-pink', width: '40px' },
    { color: 'theme4-cyan', width: '60px' },
    { color: 'theme4-cyan', width: '80px' },
  ],
  [
    { color: 'theme4-purple', width: '70px' },
    { color: 'theme4-purple', width: '90px' },
  ],
  [
    { color: 'theme4-yellow', width: '50px' },
    { color: 'theme4-blue', width: '45px' },
    { color: 'theme4-orange', width: '35px' },
    { color: 'theme4-cyan', width: '55px' },
  ],
  [
    { color: 'theme4-cyan', width: '85px' },
    { color: 'theme4-pink', width: '95px' },
  ],
  [
    { color: 'theme4-pink', width: '50px' },
    { color: 'theme4-purple', width: '65px' },
    { color: 'theme4-yellow', width: '45px' },
  ],
  [
    { color: 'theme4-blue', width: '40px' },
    { color: 'theme4-yellow', width: '70px' },
    { color: 'theme4-orange', width: '50px' },
  ],
  [
    { color: 'theme4-orange', width: '90px' },
    { color: 'theme4-cyan', width: '60px' },
  ],
  [
    { color: 'theme4-cyan', width: '55px' },
    { color: 'theme4-pink', width: '65px' },
    { color: 'theme4-purple', width: '35px' },
  ],
  [
    { color: 'theme4-yellow', width: '75px' },
    { color: 'theme4-blue', width: '55px' },
  ],
  [
    { color: 'theme4-blue', width: '45px' },
    { color: 'theme4-orange', width: '70px' },
    { color: 'theme4-pink', width: '50px' },
  ],
  [
    { color: 'theme4-pink', width: '80px' },
    { color: 'theme4-cyan', width: '70px' },
  ],
  [
    { color: 'theme4-cyan', width: '60px' },
    { color: 'theme4-purple', width: '50px' },
    { color: 'theme4-yellow', width: '40px' },
  ],
]

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('services.cards')
  const [currentSegment, setCurrentSegment] = useState(0)

  // Calculate total segments across all lines
  const totalSegments = codeSegments.reduce((sum, line) => sum + line.length, 0)

  useEffect(() => {
    if (service.id !== 'custom-software') return

    const segmentInterval = setInterval(() => {
      setCurrentSegment((prev) => {
        if (prev >= totalSegments - 1) {
          return 0 // Reset to first segment
        }
        return prev + 1
      })
    }, 500) // 0.5s per segment

    return () => clearInterval(segmentInterval)
  }, [service.id, totalSegments])

  const cardClasses = cn(
    'card-hover-effect group relative flex flex-col rounded-xl bg-card/60 backdrop-blur-sm border h-full',
    'transform-gpu transition-all duration-300 ease-out',
    'hover:-translate-y-1 hover:border-[#00E68B] hover:shadow-glow hover:bg-card/70',
    service.variant === 'ai' && 'ai-card',
    service.size === 'large' && 'justify-between p-8',
    service.size === 'medium' && 'justify-between p-6',
    service.size === 'small' && 'justify-center p-6',
    // Glassmorphism effect for custom-software card
    service.id === 'custom-software' && 'overflow-hidden',
    service.id === 'custom-software' &&
      'hover:bg-card/50 hover:backdrop-blur-md'
  )

  return (
    <div
      className={cardClasses}
      role="article"
      aria-label={t(`${service.id}.title`)}
    >
      {/* Glassmorphism overlay for custom-software card on hover */}
      {service.id === 'custom-software' && (
        <div className="absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E68B]/10 via-transparent to-[#00E68B]/5 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,230,139,0.1),transparent_50%)]" />
          {/* Crystalline pattern overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(30deg, transparent 48%, rgba(0,230,139,0.1) 49%, rgba(0,230,139,0.1) 51%, transparent 52%),
                linear-gradient(150deg, transparent 48%, rgba(0,230,139,0.05) 49%, rgba(0,230,139,0.05) 51%, transparent 52%)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      )}

      {/* Background image for large cards */}
      {service.backgroundImage && (
        <>
          <div
            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url(${service.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* GIF Image for specific cards */}
        {service.gifImage && (
          <div className="mb-4">
            <img
              src={service.gifImage}
              alt={t(`${service.id}.title`)}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Code Editor for custom-software card */}
        {service.id === 'custom-software' && (
          <div className="mb-6">
            <div className="editor-window">
              <div className="window-header">
                <div className="window-button btn-red"></div>
                <div className="window-button btn-yellow"></div>
                <div className="window-button btn-green"></div>
              </div>
              <div className="editor-body">
                {/* File Tree */}
                <div className="file-tree">
                  <div className="file-tree-item">
                    <div className="file-icon-square folder-icon"></div>
                    <div
                      className="file-name-line"
                      style={{ width: '60px' }}
                    ></div>
                  </div>
                  <div className="file-tree-indent">
                    <div className="file-tree-item">
                      <div className="file-icon-square folder-icon"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '80px' }}
                      ></div>
                    </div>
                    <div className="file-tree-indent">
                      <div className="file-tree-item">
                        <div className="file-icon-square file-icon-active"></div>
                        <div
                          className="file-name-line file-name-active"
                          style={{ width: '70px' }}
                        ></div>
                      </div>
                      <div className="file-tree-item">
                        <div className="file-icon-square file-icon-doc"></div>
                        <div
                          className="file-name-line"
                          style={{ width: '75px' }}
                        ></div>
                      </div>
                    </div>
                    <div className="file-tree-item">
                      <div className="file-icon-square folder-icon"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '50px' }}
                      ></div>
                    </div>
                    <div className="file-tree-indent">
                      <div className="file-tree-item">
                        <div className="file-icon-square file-icon-doc"></div>
                        <div
                          className="file-name-line"
                          style={{ width: '68px' }}
                        ></div>
                      </div>
                    </div>
                    <div className="file-tree-item">
                      <div className="file-icon-square file-icon-doc"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '65px' }}
                      ></div>
                    </div>
                  </div>
                  <div className="file-tree-item">
                    <div className="file-icon-square folder-icon"></div>
                    <div
                      className="file-name-line"
                      style={{ width: '70px' }}
                    ></div>
                  </div>
                  <div className="file-tree-indent">
                    <div className="file-tree-item">
                      <div className="file-icon-square file-icon-doc"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '80px' }}
                      ></div>
                    </div>
                  </div>
                  <div className="file-tree-item">
                    <div className="file-icon-square file-icon-doc"></div>
                    <div
                      className="file-name-line"
                      style={{ width: '90px' }}
                    ></div>
                  </div>
                </div>
                {/* Code Editor with typing animation */}
                <div className="editor-content">
                  <div className="code-lines-animated">
                    {codeSegments.map((lineSegments, lineIndex) => {
                      // Calculate how many segments have appeared before this line
                      let segmentsBefore = 0
                      for (let i = 0; i < lineIndex; i++) {
                        segmentsBefore += codeSegments[i].length
                      }

                      // Check if this line should be visible (at least one segment visible)
                      const lineVisible = currentSegment >= segmentsBefore

                      return (
                        <div
                          key={lineIndex}
                          className={`line-numbers ${lineVisible ? 'line-visible' : ''}`}
                        >
                          <span className="number"></span>
                          <div
                            style={{
                              display: 'flex',
                              gap: '8px',
                              alignItems: 'center',
                            }}
                          >
                            {lineSegments.map((segment, segmentIndex) => {
                              const segmentPosition =
                                segmentsBefore + segmentIndex
                              const isVisible =
                                currentSegment >= segmentPosition

                              return (
                                <div
                                  key={segmentIndex}
                                  className={`code-line ${segment.color} ${isVisible ? 'segment-visible' : ''}`}
                                  style={
                                    {
                                      '--segment-width': segment.width,
                                      maxWidth: segment.width,
                                    } as React.CSSProperties
                                  }
                                ></div>
                              )
                            })}
                            {/* Show cursor after the last visible segment in this line */}
                            {lineVisible &&
                              currentSegment >= segmentsBefore &&
                              currentSegment <
                                segmentsBefore + lineSegments.length && (
                                <span className="typing-cursor"></span>
                              )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header with badges only */}
        <div className="flex justify-end items-start mb-4">
          {service.badges && service.badges.length > 0 && (
            <div className="flex gap-2">
              {service.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/5 rounded-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Special layout for multi-platform card */}
          {service.id === 'multi-platform' ? (
            <div className="space-y-4">
              {/* Devices SVG Image - Full width */}
              <div className="w-full">
                <img
                  src="/device-logos/devices.svg"
                  alt="Multiple devices"
                  className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Title - Left aligned */}
              <h3 className="text-xl font-bold group-hover:text-[#00E68B] transition-colors">
                {t(`${service.id}.title`)}
              </h3>

              {/* Platform logos - Left aligned */}
              {service.platforms && service.platforms.length > 0 && (
                <div className="flex flex-wrap gap-3 items-center">
                  {service.platforms.map((platform) => {
                    const platformIcons: Record<string, string> = {
                      iOS: '/device-logos/apple.svg',
                      Android: '/device-logos/android.svg',
                      Web: '/device-logos/chrome.svg',
                      Windows: '/device-logos/microsoft.svg',
                    }

                    const iconPath = platformIcons[platform]

                    return iconPath ? (
                      <img
                        key={platform}
                        src={iconPath}
                        alt={platform}
                        className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <span
                        key={platform}
                        className="bg-muted text-muted-foreground text-[10px] px-2 py-1 rounded-sm uppercase"
                      >
                        {platform}
                      </span>
                    )
                  })}
                </div>
              )}

              {/* Description - Left aligned */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`${service.id}.description`)}
              </p>
            </div>
          ) : service.id === 'landing-pages' ? (
            /* Special layout for landing-pages card */
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
              {/* Left column: Title, Description, and Features */}
              <div className="space-y-3 flex flex-col">
                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-[#00E68B] transition-colors">
                    {t(`${service.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`${service.id}.description`)}
                  </p>
                </div>

                {/* Features in 2 sub-columns */}
                {service.features && service.features.length > 0 && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {service.features.map((feature) => {
                      const [icon, label] = feature.split(':')
                      return (
                        <div
                          key={feature}
                          className="flex items-center gap-1.5"
                        >
                          <span
                            className="material-symbols-outlined text-lg text-muted-foreground group-hover:text-[#00E68B] transition-colors"
                            aria-hidden="true"
                          >
                            {icon}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Right column: Browser Window */}
              <div className="flex items-start">
                <div className="browser-window w-full max-h-[290] md:max-h-[220px]">
                  <div className="browser-header">
                    <div className="browser-controls">
                      <div className="window-button btn-red"></div>
                      <div className="window-button btn-yellow"></div>
                      <div className="window-button btn-green"></div>
                    </div>
                    <div className="browser-nav">
                      <div className="browser-nav-buttons">
                        <div className="browser-nav-button">&lt;</div>
                        <div className="browser-nav-button">&gt;</div>
                        <div className="browser-nav-button">↻</div>
                      </div>
                      <div className="browser-url-bar">bryanacosta.com</div>
                      <div className="browser-settings">⚙</div>
                    </div>
                  </div>
                  <div className="browser-content">
                    <div className="browser-scroll-content">
                      {/* Section 1 */}
                      <div className="browser-element">
                        <div className="browser-image-placeholder"></div>
                        <div className="browser-text-line long"></div>
                        <div className="browser-text-line medium"></div>
                        <div className="browser-text-line short"></div>
                      </div>
                      {/* Section 2 */}
                      <div className="browser-element">
                        <div className="browser-text-line long"></div>
                        <div className="browser-text-line medium"></div>
                        <div className="browser-image-placeholder"></div>
                      </div>
                      {/* Section 3 */}
                      <div className="browser-element">
                        <div className="browser-text-line medium"></div>
                        <div className="browser-text-line long"></div>
                        <div className="browser-text-line short"></div>
                      </div>
                      {/* Section 4 */}
                      <div className="browser-element">
                        <div className="browser-image-placeholder"></div>
                        <div className="browser-text-line long"></div>
                        <div className="browser-text-line medium"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="material-symbols-outlined text-2xl text-muted-foreground group-hover:text-[#00E68B] transition-colors icon-glow"
                  aria-label={`${t(`${service.id}.title`)} icon`}
                >
                  {service.icon}
                </span>
                <h3 className="text-xl font-bold group-hover:text-[#00E68B] transition-colors">
                  {t(`${service.id}.title`)}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {t(`${service.id}.description`)}
              </p>

              {/* Features with divider above (not for landing-pages) */}
              {service.features &&
                service.features.length > 0 &&
                service.id !== 'landing-pages' && (
                  <div className="border-t border-border pt-4 space-y-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ color: '#00E68B' }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
            </>
          )}
        </div>

        {/* Footer features for cards that already handled features inline */}
        {service.features &&
          service.features.length > 0 &&
          service.id !== 'landing-pages' &&
          service.id === 'multi-platform' && (
            <div className="mt-6 border-t border-border pt-4 space-y-2">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ color: '#00E68B' }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}

        {/* Footer platforms (only for non-multi-platform cards) */}
        {service.platforms &&
          service.platforms.length > 0 &&
          service.id !== 'multi-platform' && (
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              {service.platforms.map((platform) => {
                const platformIcons: Record<string, string> = {
                  iOS: '/device-logos/apple.svg',
                  Android: '/device-logos/android.svg',
                  Web: '/device-logos/chrome.svg',
                  Windows: '/device-logos/microsoft.svg',
                  OpenAI: '/ai-logos/openai.svg',
                  Claude: '/ai-logos/claude.svg',
                  Gemini: '/ai-logos/gemini.svg',
                  Mistral: '/ai-logos/mistral.svg',
                  Ollama: '/ai-logos/ollama.svg',
                  Grok: '/ai-logos/grok.svg',
                  DeepSeek: '/ai-logos/deepseek.svg',
                  Qwen: '/ai-logos/qwen.svg',
                  MiniMax: '/ai-logos/minimax.svg',
                  HuggingFace: '/ai-logos/huggingface.svg',
                  MCP: '/ai-logos/mcp.svg',
                }

                const iconPath = platformIcons[platform]

                return iconPath ? (
                  <img
                    key={platform}
                    src={iconPath}
                    alt={platform}
                    className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span
                    key={platform}
                    className="bg-muted text-muted-foreground text-[10px] px-2 py-1 rounded-sm uppercase"
                  >
                    {platform}
                  </span>
                )
              })}
            </div>
          )}
      </div>
    </div>
  )
}
