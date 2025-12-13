import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

// Mock the cn utility
vi.mock('@/lib/utils', () => ({
  cn: (...inputs: (string | undefined)[]) => inputs.filter(Boolean).join(' ')
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
    render(<Avatar data-testid="avatar" aria-label="User avatar" id="my-avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('aria-label', 'User avatar')
    expect(avatar).toHaveAttribute('id', 'my-avatar')
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
    expect(image.className).toContain('aspect-square')
    expect(image.className).toContain('h-full')
    expect(image.className).toContain('w-full')
  })

  it('should merge custom className with default classes', () => {
    render(<AvatarImage data-testid="avatar-image" src="/test.jpg" className="object-cover" />)
    const image = screen.getByTestId('avatar-image')
    expect(image.className).toContain('object-cover')
    expect(image.className).toContain('aspect-square')
  })

  it('should have empty string as default alt attribute', () => {
    render(<AvatarImage data-testid="avatar-image" src="/test.jpg" />)
    const image = screen.getByTestId('avatar-image')
    expect(image).toHaveAttribute('alt', '')
  })

  it('should use custom alt when provided', () => {
    render(<AvatarImage data-testid="avatar-image" src="/test.jpg" alt="Profile picture" />)
    const image = screen.getByTestId('avatar-image')
    expect(image).toHaveAttribute('alt', 'Profile picture')
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
    render(<AvatarFallback data-testid="avatar-fallback" className="bg-blue-500" />)
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback.className).toContain('bg-blue-500')
    expect(fallback.className).toContain('flex')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()
    render(<AvatarFallback ref={ref} data-testid="avatar-fallback" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toBe(screen.getByTestId('avatar-fallback'))
  })

  it('should spread additional props to the element', () => {
    render(
      <AvatarFallback
        data-testid="avatar-fallback"
        aria-label="User initials"
        role="img"
      />
    )
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback).toHaveAttribute('aria-label', 'User initials')
    expect(fallback).toHaveAttribute('role', 'img')
  })

  it('should render children correctly', () => {
    render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>)
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback).toHaveTextContent('JD')
  })

  it('should have correct displayName', () => {
    expect(AvatarFallback.displayName).toBe('AvatarFallback')
  })
})

describe('Avatar composition', () => {
  it('should render Avatar with AvatarImage and AvatarFallback together', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage data-testid="avatar-image" src="/user.jpg" alt="User" />
        <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument()
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
  })
})