import {
  Shield, FileLock2, Users, ClipboardList,
  MessageCircle, Smartphone, Monitor,
  ArrowRight, ArrowDown, ArrowUp,
  Check, Plus, Minus, Search,
  Instagram, Twitter, Linkedin, Youtube, Music2, UserPlus
} from 'lucide-react'

/**
 * Name → component lookup for icons used across the site, so data modules
 * can reference icons by string without importing lucide-react directly.
 */
const map = {
  shield: Shield,
  'file-lock': FileLock2,
  users: Users,
  clipboard: ClipboardList,
  'message-circle': MessageCircle,
  smartphone: Smartphone,
  monitor: Monitor,
  'arrow-right': ArrowRight,
  'arrow-down': ArrowDown,
  'arrow-up': ArrowUp,
  check: Check,
  plus: Plus,
  minus: Minus,
  search: Search,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Music2,
  'user-plus': UserPlus
}

export default function Icon({ name, size = 22, strokeWidth = 1.5, className = '', ...rest }) {
  const C = map[name]
  if (!C) return null
  return <C size={size} strokeWidth={strokeWidth} className={className} {...rest} />
}
