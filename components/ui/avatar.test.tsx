import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

// Mock the cn utility
vi.mock('@/lib/utils', () => ({
  cn: (...args: (string | undefined)[]) => args.filter(Boolean).join(' ')
}))

describe('Avatar', () => {
  it('should render with default classes', () => {
    render(<Avatar data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar.className).toContain('relative')
    expect(avatar.className).toContain('flex')
    expect(avatar.className).toContain('h-10')
    expect(avatar.className).toContain('w-10')
    expect(avatar.className).toContain('rounded-full')
  })

  it('should merge custom className with default classes', () => {
    render(<Avatar data-testid="avatar" className="custom-class" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar.className).toContain('custom-class')
    expect(avatar.className).toContain('relative')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Avatar ref={ref} data-testid="avatar" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toBe(screen.getByTestId('avatar'))
  })

  it('should spread additional props to the element', () => {
    render(<Avatar data-testid="avatar" id="my-avatar" aria-label="User avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('id', 'my-avatar')
    expect(avatar).toHaveAttribute('aria-label', 'User avatar')
  })

  it('should have correct displayName', () => {
    expect(Avatar.displayName).toBe('Avatar')
  })
})

describe('AvatarImage', () => {
  it('should render with default classes', () => {
    render(<AvatarImage data-testid="avatar-image" src="/test.jpg" />)
    const image = screen.getByTestId('avatar-image')
    expect(image).toBeInTheDocument()
    expect(image.tagName).toBe('IMG')
    expect(image.className).toContain('aspect-square')
    expect(image.className).toContain('h-full')
    expect(image.className).toContain('w-full')
  })

  it('should merge custom className with default classes', () => {
    render(<AvatarImage data-testid="avatar-image" className="custom-image" src="/test.jpg" />)
    const image = screen.getByTestId('avatar-image')
    expect(image.className).toContain('custom-image')
    expect(image.className).toContain('aspect-square')
  })

  it('should default alt to empty string when not provided', () => {
    render(<AvatarImage data-testid="avatar-image" src="/test.jpg" />)
    const image = screen.getByTestId('avatar-image')
    expect(image).toHaveAttribute('alt', '')
  })

  it('should use provided alt attribute', () => {
    render(<AvatarImage data-testid="avatar-image" src="/test.jpg" alt="User profile" />)
    const image = screen.getByTestId('avatar-image')
    expect(image).toHaveAttribute('alt', 'User profile')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLImageElement>()
    render(<AvatarImage ref={ref} data-testid="avatar-image" src="/test.jpg" />)
    expect(ref.current).toBeInstanceOf(HTMLImageElement)
    expect(ref.current).toBe(screen.getByTestId('avatar-image'))
  })

  it('should spread additional props to the element', () => {
    render(
      <AvatarImage
        data-testid="avatar-image"
        src="/test.jpg"
        width={100}
        height={100}
        loading="lazy"
      />
    )
    const image = screen.getByTestId('avatar-image')
    expect(image).toHaveAttribute('src', '/test.jpg')
    expect(image).toHaveAttribute('width', '100')
    expect(image).toHaveAttribute('height', '100')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('should have correct displayName', () => {
    expect(AvatarImage.displayName).toBe('AvatarImage')
  })
})

describe('AvatarFallback', () => {
  it('should render with default classes', () => {
    render(<AvatarFallback data-testid="avatar-fallback" />)
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback).toBeInTheDocument()
    expect(fallback.className).toContain('flex')
    expect(fallback.className).toContain('h-full')
    expect(fallback.className).toContain('w-full')
    expect(fallback.className).toContain('items-center')
    expect(fallback.className).toContain('justify-center')
    expect(fallback.className).toContain('rounded-full')
    expect(fallback.className).toContain('bg-muted')
  })

  it('should merge custom className with default classes', () => {
    render(<AvatarFallback data-testid="avatar-fallback" className="custom-fallback" />)
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback.className).toContain('custom-fallback')
    expect(fallback.className).toContain('flex')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()
    render(<AvatarFallback ref={ref} data-testid="avatar-fallback" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toBe(screen.getByTestId('avatar-fallback'))
  })

  it('should render children content', () => {
    render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>)
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback).toHaveTextContent('JD')
  })

  it('should spread additional props to the element', () => {
    render(
      <AvatarFallback
        data-testid="avatar-fallback"
        id="my-fallback"
        role="img"
        aria-label="User initials"
      />
    )
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback).toHaveAttribute('id', 'my-fallback')
    expect(fallback).toHaveAttribute('role', 'img')
    expect(fallback).toHaveAttribute('aria-label', 'User initials')
  })

  it('should have correct displayName', () => {
    expect(AvatarFallback.displayName).toBe('AvatarFallback')
  })
})

describe('Avatar composition', () => {
  it('should render Avatar with AvatarImage and AvatarFallback', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage data-testid="avatar-image" src="/test.jpg" alt="Test user" />
        <AvatarFallback data-testid="avatar-fallback">TU</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument()
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
  })
})