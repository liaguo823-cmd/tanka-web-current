"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Atom,
  BookOpen,
  BookOpenText,
  BarChart3,
  Bookmark,
  Box,
  Bell,
  Briefcase,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  Coins,
  Clock,
  Mail,
  ListTodo,
  Pencil,
  Rocket,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Circle,
  Copy,
  CreditCard,
  Download,
  FileText,
  Filter,
  Flag,
  Folder,
  FolderPlus,
  Grid3X3,
  Home as HomeIcon,
  Layout,
  Share2,
  Trash2,
  Image as ImageIcon,
  LayoutGrid,
  Link2,
  ListFilter,
  LogOut,
  Maximize2,
  Megaphone,
  MessageSquare,
  Mic,
  Moon,
  MoreVertical,
  PanelLeftClose,
  PanelLeftOpen,
  Paperclip,
  Phone,
  Plus,
  RefreshCw,
  Scissors,
  Search,
  Settings,
  Sparkles,
  Sun,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Users,
  Video,
  Vote,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  chatItems,
  getChatConversation,
  designTeamAvatarUrl,
  flowItems,
  getFlowActionScenario,
  getFlowDetail,
  getGroupMembers,
  linkCategories,
  linkTools,
  navGroups,
  sampleConversation,
  suggestedTasks,
  workspaces,
  type ChatItem,
  type ChatMessage,
  type FlowDetail,
  type FlowItem,
  type GroupMember,
  type LinkCategoryKey,
  type LinkTool,
  type WorkspaceItem,
} from "./data";

// Phosphor fill-weight icons for the nav — clean rounded filled glyphs
// (Intercom-style).
import {
  ClipboardText as PhClipboardText,
  ChatCircleDots as PhChatCircleDots,
  PuzzlePiece as PhPuzzlePiece,
  BookOpen as PhBookOpen,
  Flag as PhFlag,
  CheckCircle as PhCheckCircle,
  Calendar as PhCalendar,
} from "@phosphor-icons/react/dist/ssr";

type NavIconComponent = React.ComponentType<{ className?: string; active?: boolean }>;

const NAV_ACTIVE_FILL = "#0891B2";

const FillIcon =
  (PhIcon: React.ComponentType<{ weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"; size?: number | string; className?: string; color?: string }>): NavIconComponent =>
  ({ className, active }) => (
    <PhIcon
      weight="fill"
      size={20}
      className={className}
      color={active ? NAV_ACTIVE_FILL : "currentColor"}
    />
  );

// Custom "Warp Rise" — Flow nav icon
function FlowIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={active ? NAV_ACTIVE_FILL : "currentColor"} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.4657 3.49481c1.6717-1.55705 4.0379-2.4245 6.4931-2.4245h3.2422c0.4142 0 0.75 0.33579 0.75 0.75v4.71093l-3.4386 0c-2.2132 0-4.3442 0.8387-5.9637 2.34717L9.02448 14.0238c-1.3419 1.2499-3.10759 1.9448-4.9414 1.9448H0.0498047v-4.7109c0-0.4142 0.3357863-0.75 0.7500003-0.75H2.6367c2.11785 0 4.10606-0.75101 5.47079-2.02216l5.35821-4.99073ZM0.0498047 17.4686v4.7109c0 0.4142 0.3357863 0.75 0.7500003 0.75H4.6367c2.45519 0 4.82146-0.8675 6.4932-2.4245l5.3581-4.9907c1.3648-1.2712 3.353-2.0222 5.4708-2.0222h1.2422c0.4142 0 0.75-0.3358 0.75-0.75V8.03124l-3.4386 0c-1.8338 0-3.5995 0.69492-4.9414 1.9448l-5.5242 5.14536c-1.61949 1.5085-3.7505 2.3472-5.96372 2.3472H0.0498047Z" />
    </svg>
  );
}

// Custom robot — Agent nav icon (v3: rounded body with face cutouts, no antenna)
function AgentRobotIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="18 19 141 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Body */}
      <path
        d="M110.796 29C114.424 29.0426 118.054 29.0445 121.683 29.0049C130.068 28.9955 136.018 29.4952 142.392 35.846C148.415 41.8464 149.327 47.7798 149.345 55.7925L149.354 104.392L149.351 118.322C149.334 127.776 149.525 134.399 142.269 141.612C139.136 144.733 135.176 146.896 130.855 147.843C127.554 148.554 123.554 148.414 120.136 148.414L108.019 148.407L65.4545 148.409H55.8939C47.5708 148.401 41.2043 147.779 34.9467 141.515C29.9793 136.543 28.0534 130.88 28.0405 123.934C28.0098 107.606 28.0261 91.2729 28.0249 74.9433L28.0243 60.1747C28.0241 56.1039 27.8027 50.7659 28.7 46.8596C30.6116 38.5391 37.8065 31.4453 46.1257 29.5848C49.4682 28.8375 53.8445 29.0163 57.3419 29.0258L67.9518 29.0281L110.796 29Z"
        fill={active ? NAV_ACTIVE_FILL : "currentColor"}
      />
      {/* Inner face / details — drawn on top with bg color for cutout effect */}
      <path
        d="M124.989 67.4573C127.507 67.4419 135.624 66.7364 137.246 68.3819C137.721 68.863 137.963 69.5006 138.061 70.1595C138.409 72.4972 138.086 78.8173 138.019 81.5022C137.302 82.5248 137.277 82.5538 136.225 83.3175L136.024 83.3266C132.445 83.4517 128.644 83.43 125.071 83.303C122.199 83.1996 122.203 81.0798 122.165 78.9565C108.035 79.4363 113.642 91.7363 101.111 94.8001C101.079 97.5629 101.777 102.571 99.943 104.585C98.5825 106.08 94.5246 105.664 92.5328 105.668L81.6735 105.664C77.2974 105.632 76.1713 104.688 76.1644 100.052C76.1622 98.6059 76.1852 97.0858 76.2041 95.6328C68.9789 96.4273 68.6252 99.0286 64.4047 104.162C61.8751 107.239 58.8579 108.476 54.9663 108.81C54.994 110.107 54.9911 111.402 54.9578 112.699C53.469 114.934 52.1228 114.56 49.6235 114.518C40.4116 114.591 38.6573 116.289 39.1426 105.84C39.2378 103.79 38.7692 101.098 40.0225 99.3406C42.1262 97.9583 47.8692 98.6821 50.5166 98.5279C55.7418 98.225 55.0205 101.289 55.0213 105.064C65.2635 103.836 62.1748 92.8592 76.1934 91.9431C76.2152 89.4724 75.6862 83.6658 77.1604 81.8369C77.8998 81.159 79.757 80.6861 80.6682 80.6872C86.485 80.6948 92.3623 80.4677 98.1581 80.8258C98.6787 80.9152 99.5113 81.3535 99.865 81.7168C101.71 83.6132 101.086 88.4221 101.193 91.0161C110.499 87.6584 105.369 76.0914 122.223 75.1795C122.152 72.1247 121.198 68.1515 124.989 67.4573Z"
        fill="var(--color-warm-bg)"
      />
    </svg>
  );
}

// Custom SOP nav icon — play frame with side bar
function SopIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="33 33 378 378" fill={active ? NAV_ACTIVE_FILL : "currentColor"} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M387.128 69H152.061C138.422 69 127.366 80.0562 127.366 93.6948V157.087C127.366 170.725 138.422 181.781 152.061 181.781H387.128C400.767 181.781 411.823 170.725 411.823 157.087V93.6948C411.823 80.0562 400.767 69 387.128 69Z" />
      <path d="M117.141 227.479L52.1506 292.47C50.5828 294.039 48.5849 295.108 46.4095 295.542C44.2342 295.976 41.9791 295.755 39.9293 294.907C37.8795 294.059 36.1271 292.623 34.8937 290.779C33.6603 288.935 33.0013 286.767 33 284.549V157.228C32.9979 155.029 33.6425 152.877 34.8536 151.041C36.0647 149.205 37.7889 147.766 39.8116 146.902C41.8344 146.038 44.0666 145.789 46.2302 146.184C48.3939 146.579 50.3936 147.601 51.9808 149.124L116.971 211.455C118.048 212.488 118.908 213.725 119.501 215.095C120.094 216.465 120.408 217.939 120.423 219.431C120.439 220.924 120.157 222.404 119.593 223.786C119.03 225.168 118.196 226.424 117.141 227.479Z" />
      <path d="M411.823 286.19V349.978C411.823 353.258 411.177 356.506 409.922 359.536C408.667 362.567 406.827 365.32 404.507 367.64C402.188 369.959 399.434 371.799 396.404 373.054C393.374 374.309 390.126 374.955 386.845 374.955H152.287C149.007 374.955 145.759 374.309 142.729 373.054C139.698 371.799 136.945 369.959 134.625 367.64C132.306 365.32 130.466 362.567 129.211 359.536C127.956 356.506 127.31 353.258 127.31 349.978V286.19C127.31 282.91 127.956 279.662 129.211 276.631C130.466 273.601 132.306 270.847 134.625 268.528C136.945 266.209 139.698 264.369 142.729 263.113C145.759 261.858 149.007 261.212 152.287 261.212H386.845C390.126 261.212 393.374 261.858 396.404 263.113C399.434 264.369 402.188 266.209 404.507 268.528C406.827 270.847 408.667 273.601 409.922 276.631C411.177 279.662 411.823 282.91 411.823 286.19Z" />
    </svg>
  );
}

// Custom Chat nav icon — double speech bubble
function ChatBubbleIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="47 47 350 350" fill={active ? NAV_ACTIVE_FILL : "currentColor"} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M137.398 187.875C137.398 187.816 137.386 187.757 137.362 187.702C137.339 187.647 137.305 187.596 137.261 187.554C137.218 187.512 137.167 187.479 137.11 187.456C137.054 187.433 136.993 187.421 136.932 187.421C108.312 187.469 93.5769 187.493 92.7258 187.493C81.9993 187.445 72.5375 179.854 68.779 170.483C67.562 167.446 66.9694 160.736 67.0012 150.353C67.1285 114.539 67.1405 91.5599 67.037 81.4151C66.9575 74.0037 67.3672 68.9871 68.266 66.3653C72.108 55.2124 81.4266 47.036 93.4417 47.048C219.877 47.1356 305.283 47.1197 349.661 47.0001C361.712 46.9643 371.854 54.1724 375.66 65.409C376.535 67.983 376.968 72.4617 376.96 78.845C376.921 123.05 376.924 149.767 376.972 158.995C377.02 168.211 374.371 175.575 367.367 181.504C362.682 185.481 356.406 187.477 348.539 187.493C293.105 187.549 247.343 187.501 211.254 187.35C208.733 187.334 206.585 188.079 204.811 189.585C182.833 208.289 160.831 226.793 138.806 245.098C138.472 245.377 138.213 245.525 138.03 245.541C137.656 245.564 137.469 245.393 137.469 245.027C137.43 221.94 137.406 202.889 137.398 187.875Z" />
      <path d="M115.634 214.879C115.765 214.879 115.891 214.932 115.985 215.026C116.078 215.119 116.132 215.247 116.136 215.381C116.239 227.51 116.211 243.489 116.052 263.316C115.957 274.421 125.275 280.673 135.357 276.094C136.081 275.768 138.686 273.712 143.172 269.926C171.291 246.234 192.836 228.204 207.806 215.835C208.586 215.193 209.563 214.839 210.574 214.831C260.782 214.768 305.943 214.756 346.057 214.795C352.803 214.803 357.508 215.337 360.172 216.397C370.195 220.402 376.936 230.228 376.936 241.189C376.944 282.223 376.964 304.895 376.996 309.206C377.052 315.781 376.539 320.594 375.457 323.647C371.925 333.664 362.642 340.848 351.749 340.932C339.746 341.019 326.334 341.051 311.515 341.027C311.316 341.027 311.125 341.107 310.984 341.248C310.843 341.389 310.764 341.581 310.764 341.78C310.621 355.408 310.636 370.884 310.811 388.209C310.847 391.723 310.036 395.226 306.552 396.469C303.823 397.441 301.493 397.079 299.56 395.381C275.991 374.693 255.787 356.798 238.947 341.697C238.44 341.242 237.786 340.991 237.11 340.992C195.238 341.023 147.452 341.035 93.7519 341.027C89.5281 341.027 85.8213 340.254 82.6316 338.708C72.2908 333.696 67.1047 325.193 67.0729 313.199C67.0729 313 67.0729 291.216 67.0729 247.848C67.0649 240.524 67.5341 235.535 68.4807 232.882C72.0244 222.864 81.6294 215.035 92.5468 214.903C101.965 214.791 109.661 214.784 115.634 214.879Z" />
    </svg>
  );
}

// Custom Link nav icon — gear/cog with sparkle in center
function LinkSparkleIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="44 44 356 356" fill={active ? NAV_ACTIVE_FILL : "currentColor"} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M344.379 221.543C344.379 236.021 344.396 246.067 344.429 251.679C344.429 251.786 344.451 251.892 344.492 251.99C344.533 252.089 344.594 252.179 344.67 252.254C344.747 252.33 344.837 252.39 344.937 252.431C345.037 252.472 345.144 252.493 345.252 252.493C368.294 252.411 379.848 252.369 379.914 252.369C384.41 252.18 387.754 252.702 389.948 253.935C397.177 257.978 399.396 266.988 394.672 273.89C391.207 278.944 386.67 279.708 380.326 279.683C377.16 279.667 365.464 279.667 345.239 279.683C345.035 279.683 344.839 279.763 344.693 279.906C344.546 280.048 344.461 280.243 344.454 280.447C344.321 285.328 344.309 290.357 344.417 295.534C344.566 302.773 344.334 307.815 343.719 310.658C339.531 329.948 323.652 343.58 303.385 343.592C293.705 343.6 286.164 343.543 280.763 343.42C280.649 343.418 280.537 343.439 280.432 343.481C280.327 343.523 280.231 343.586 280.151 343.665C280.071 343.744 280.008 343.839 279.965 343.943C279.922 344.047 279.901 344.158 279.903 344.27C280.011 353.432 279.986 366.325 279.828 382.948C279.666 400.623 253.703 400.944 252.931 383.552C252.756 379.682 252.752 366.871 252.918 345.12C252.92 344.919 252.881 344.719 252.805 344.532C252.729 344.345 252.616 344.175 252.474 344.032C252.331 343.888 252.162 343.775 251.975 343.697C251.788 343.62 251.588 343.58 251.385 343.58H193.851C193.726 343.58 193.601 343.605 193.486 343.653C193.37 343.702 193.265 343.773 193.177 343.862C193.089 343.951 193.019 344.058 192.972 344.174C192.925 344.291 192.902 344.416 192.904 344.541C193.053 358.387 193.045 371.181 192.879 382.924C192.679 397.702 173.049 401.967 166.854 388.076C166.114 386.416 165.757 383.552 165.782 379.485C165.89 361.316 165.882 349.677 165.757 344.566C165.751 344.3 165.638 344.047 165.445 343.863C165.251 343.678 164.992 343.576 164.723 343.58C158.457 343.596 150.061 343.576 139.533 343.518C120.986 343.42 105.045 328.542 101.343 310.966C100.662 307.737 100.375 302.671 100.483 295.768C100.574 290.337 100.578 285.23 100.495 280.447C100.492 280.26 100.413 280.081 100.276 279.95C100.138 279.818 99.9529 279.745 99.76 279.745C81.8367 279.646 70.5651 279.63 65.9451 279.696C61.1755 279.761 57.9099 279.449 56.1483 278.759C41.179 272.867 46.0774 252.184 62.2806 252.369C72.7754 252.484 85.0774 252.464 99.1867 252.308C99.5285 252.305 99.8559 252.171 100.1 251.934C100.344 251.697 100.486 251.376 100.495 251.038C100.562 248.82 100.595 238.984 100.595 221.531C100.595 204.077 100.562 194.241 100.495 192.023C100.486 191.685 100.344 191.364 100.1 191.127C99.8559 190.89 99.5285 190.756 99.1867 190.753C85.0774 190.597 72.7754 190.576 62.2806 190.692C46.0774 190.876 41.179 170.194 56.1483 164.302C57.9099 163.612 61.1755 163.3 65.9451 163.365C70.5651 163.431 81.8367 163.415 99.76 163.316C99.9529 163.316 100.138 163.242 100.276 163.111C100.413 162.98 100.492 162.801 100.495 162.613C100.578 157.831 100.574 152.724 100.483 147.293C100.375 140.39 100.662 135.324 101.343 132.095C105.045 114.518 120.999 99.6413 139.545 99.555C150.073 99.4975 158.47 99.477 164.735 99.4935C165.004 99.4968 165.263 99.395 165.457 99.2104C165.651 99.0259 165.763 98.7733 165.77 98.5073C165.894 93.3963 165.903 81.7567 165.795 63.5885C165.77 59.521 166.127 56.6574 166.866 54.9975C173.061 41.1064 192.692 45.3711 192.891 60.1497C193.058 71.892 193.066 84.6861 192.916 98.532C192.915 98.6577 192.938 98.7824 192.985 98.899C193.032 99.0156 193.101 99.1218 193.189 99.2112C193.277 99.3006 193.382 99.3716 193.498 99.42C193.614 99.4685 193.738 99.4935 193.864 99.4935H251.398C251.6 99.4935 251.8 99.4535 251.987 99.376C252.174 99.2984 252.344 99.1847 252.486 99.0415C252.629 98.8982 252.741 98.7282 252.818 98.5413C252.894 98.3545 252.932 98.1545 252.931 97.9527C252.764 76.2019 252.769 63.3913 252.943 59.5211C253.716 42.1295 279.679 42.4499 279.841 60.125C279.998 76.7483 280.023 89.641 279.915 98.8031C279.914 98.9153 279.935 99.0266 279.977 99.1306C280.02 99.2345 280.083 99.329 280.163 99.4083C280.244 99.4876 280.339 99.5502 280.444 99.5923C280.549 99.6345 280.662 99.6554 280.775 99.6537C286.176 99.5304 293.717 99.4729 303.398 99.4811C323.664 99.4935 339.531 113.126 343.719 132.415C344.334 135.259 344.566 140.3 344.417 147.539C344.309 152.716 344.321 157.745 344.454 162.626C344.461 162.831 344.546 163.025 344.693 163.168C344.839 163.31 345.035 163.39 345.239 163.39C365.464 163.415 377.16 163.419 380.326 163.402C386.67 163.378 391.207 164.142 394.672 169.195C399.396 176.098 397.177 185.108 389.948 189.151C387.754 190.383 384.41 190.905 379.914 190.716C379.848 190.716 368.294 190.671 345.252 190.58C345.034 190.58 344.824 190.666 344.67 190.819C344.516 190.971 344.429 191.178 344.429 191.394C344.396 197.015 344.379 207.064 344.379 221.543ZM222.643 292.12C225.31 292.12 227.462 290.92 229.099 288.521C229.275 288.26 229.421 287.979 229.536 287.683C231.63 282.341 233.532 277.74 235.244 273.878C245.141 251.593 262.204 238.01 285.25 229.9C289.475 228.408 293.165 225.598 292.292 221.432C291.652 218.359 290.356 216.432 288.403 215.651C284.556 214.106 280.53 212.434 276.326 210.634C256.566 202.171 242.644 188.004 234.559 168.135C232.889 164.043 231.422 160.391 230.159 157.178C228.701 153.48 226.719 150.645 222.606 150.645C218.493 150.645 216.511 153.492 215.065 157.178C213.794 160.391 212.327 164.043 210.665 168.135C202.588 188.013 188.67 202.187 168.911 210.659C164.706 212.459 160.68 214.135 156.833 215.688C154.88 216.469 153.588 218.396 152.957 221.469C152.084 225.635 155.773 228.445 159.999 229.924C183.045 238.035 200.12 251.605 210.029 273.878C211.741 277.74 213.644 282.341 215.738 287.683C215.856 287.979 216.007 288.261 216.187 288.521C217.824 290.92 219.976 292.12 222.643 292.12Z" />
    </svg>
  );
}

// Custom Vote nav icon — bold check breaking out of a filled disc
function VoteCheckIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="48" cy="56" r="40" fill={active ? NAV_ACTIVE_FILL : "currentColor"} />
      <path
        d="M26 56 L44 73 L90 14"
        stroke="var(--color-warm-bg)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Custom Follow-ups nav icon — lightning bolt pair
function FollowupsBoltIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="20 20 220 220" fill={active ? NAV_ACTIVE_FILL : "currentColor"} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M131.79,69.65l-43.63,96A4,4,0,0,1,84.52,168H28.23a8.2,8.2,0,0,1-6.58-3.13,8,8,0,0,1,.43-10.25L57.19,116,22.08,77.38a8,8,0,0,1-.43-10.26A8.22,8.22,0,0,1,28.23,64h99.92A4,4,0,0,1,131.79,69.65ZM237.56,42.24A8.3,8.3,0,0,0,231.77,40H168a8,8,0,0,0-7.28,4.69l-42.57,93.65a4,4,0,0,0,3.64,5.66h57.79l-34.86,76.69a8,8,0,1,0,14.56,6.62l80-176A8,8,0,0,0,237.56,42.24Z" />
    </svg>
  );
}

const iconMap: Record<string, NavIconComponent> = {
  LayoutGrid: FlowIcon,
  BookOpen: FillIcon(PhBookOpen),
  Box: AgentRobotIcon,
  MessageSquare: ChatBubbleIcon,
  Link2: LinkSparkleIcon,
  BookOpenText: FillIcon(PhBookOpen),
  ClipboardList: SopIcon,
  Flag: FollowupsBoltIcon,
  Check: VoteCheckIcon,
  Calendar: FillIcon(PhCalendar),
};

type NavKey =
  | "flow"
  | "sop"
  | "chat"
  | "link"
  | "memos"
  | "followups"
  | "votes"
  | "calendar";
type FilterKey = "all" | "active" | "completed" | "foryou";

function hasListColumn(nav: NavKey): boolean {
  // Pages that own the full main area without the dual-column list+detail layout
  return !["link", "memos", "followups", "votes", "calendar", "sop"].includes(
    nav,
  );
}

const NAV_DEFAULT = 180;
const NAV_MIN = 160;
const NAV_MAX = 320;
const NAV_COLLAPSE_THRESHOLD = 120;
const NAV_COLLAPSED_WIDTH = 48;
const LIST_DEFAULT = 290;
const LIST_MIN = 240;
const LIST_MAX = 460;
const LIST_COLLAPSE_THRESHOLD = 180;
const LIST_COLLAPSED_WIDTH = 44;

function startColumnResize(
  e: React.MouseEvent,
  startWidth: number,
  setWidth: (w: number) => void,
  opts: {
    threshold: number;
    collapsedWidth: number;
    min: number;
    max: number;
  },
) {
  e.preventDefault();
  const startX = e.clientX;
  const onMove = (ev: MouseEvent) => {
    const next = startWidth + (ev.clientX - startX);
    if (next < opts.threshold) {
      setWidth(opts.collapsedWidth);
    } else {
      setWidth(Math.max(opts.min, Math.min(opts.max, next)));
    }
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
  document.body.style.cursor = "ew-resize";
  document.body.style.userSelect = "none";
}

// Shared 5-state color system: Done / Active / Alert / New / Idle
type StatusKey = "done" | "active" | "alert" | "new" | "idle";
const STATUS: Record<StatusKey, { dot: string; label: string; tint: string }> = {
  done:   { dot: "#3a8a5e", label: "#2e6f4b", tint: "#e6f1ea" },
  active: { dot: "#c47e1a", label: "#8e5b10", tint: "#faf0d8" },
  alert:  { dot: "#c44a3a", label: "#9e3a2d", tint: "#f6e1dc" },
  new:    { dot: "#2563b8", label: "#1d4a8a", tint: "#dde7f6" },
  idle:   { dot: "#827d73", label: "#5e574e", tint: "#efefea" },
};

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState("t");
  const [activeNav, setActiveNav] = useState<NavKey>("flow");
  const [orgRailOpen, setOrgRailOpen] = useState(true);
  const [navWidth, setNavWidth] = useState(NAV_DEFAULT);
  const [listWidth, setListWidth] = useState(LIST_DEFAULT);
  const navCollapsed = navWidth < NAV_COLLAPSE_THRESHOLD;
  const listCollapsed = listWidth < LIST_COLLAPSE_THRESHOLD;
  const [theme, setTheme] = useState<Theme>("light");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(true);
  const [membersPanelOpen, setMembersPanelOpen] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>("1");
  const [taskInput, setTaskInput] = useState("");
  const [openedConversation, setOpenedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(sampleConversation);
  const [chatInput, setChatInput] = useState("");
  const suggestionIdx = 0;

  const listLabel = activeNav === "chat" ? "Chat" : "Flow";

  const filteredFlow = useMemo<FlowItem[]>(() => {
    const term = search.trim().toLowerCase();
    return flowItems.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && item.status === "active") ||
        (filter === "completed" && item.status === "completed") ||
        (filter === "foryou" && item.forYou);
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.preview.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const filteredChat = useMemo<ChatItem[]>(() => {
    const term = search.trim().toLowerCase();
    return chatItems.filter(
      (c) =>
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.preview.toLowerCase().includes(term),
    );
  }, [search]);

  const groupedFlowItems = useMemo(() => {
    const pinned = filteredFlow.filter((f) => f.pinned);
    const rest = filteredFlow.filter((f) => !f.pinned);
    const groups: Record<string, FlowItem[]> = {};
    for (const item of rest) {
      groups[item.month] = groups[item.month] || [];
      groups[item.month].push(item);
    }
    const out = Object.entries(groups).map(([month, items]) => ({ month, items }));
    if (pinned.length > 0) {
      out.unshift({ month: "PINNED", items: pinned });
    }
    return out;
  }, [filteredFlow]);

  const groupedChatItems = useMemo(() => {
    const pinned = filteredChat.filter((c) => c.pinned);
    const today = filteredChat.filter((c) => !c.pinned);
    return { pinned, today };
  }, [filteredChat]);

  function handleNavSelect(next: NavKey) {
    setActiveNav(next);
    if (next === "chat") {
      setOpenedConversation("design-team");
      setSelectedItemId("design-team");
      setMessages(getChatConversation("design-team"));
    } else {
      setOpenedConversation(null);
      setSelectedItemId(null);
    }
  }

  function handleTaskSubmit() {
    if (!taskInput.trim()) return;
    setOpenedConversation("new-task");
    setSelectedItemId(null);
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        id: `u-${Date.now()}`,
        text: taskInput.trim(),
        time: now,
        self: true,
      },
      {
        id: `a-${Date.now() + 1}`,
        author: "Tanka",
        authorInitials: "T",
        authorColor: "#26201c",
        text: "Got it — I'll start working on that. Want me to pull in any specific data sources?",
        time: now,
      },
    ]);
    setTaskInput("");
  }

  function handleChatSend() {
    if (!chatInput.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      text: chatInput.trim(),
      time: now,
      self: true,
    };
    setMessages((m) => [...m, newMsg]);
    setChatInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          author: "Tanka",
          authorInitials: "T",
          authorColor: "#26201c",
          text: "Thanks — pulling that together now.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 700);
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-warm-bg-2 text-warm-black">
      {/* Global SVG defs — referenced by url() from nav icons when active */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden>
        <defs>
          <linearGradient id="nav-active-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#52d676" />
            <stop offset="50%" stopColor="#4ec2dd" />
            <stop offset="100%" stopColor="#4d8df7" />
          </linearGradient>
        </defs>
      </svg>
      {orgRailOpen && (
        <WorkspaceRail
          active={activeWorkspace}
          onSelect={setActiveWorkspace}
          onCollapse={() => setOrgRailOpen(false)}
        />
      )}
      <NavSidebar
        active={activeNav}
        onSelect={handleNavSelect}
        workspace={workspaces.find((w) => w.id === activeWorkspace) ?? workspaces[1]}
        orgRailOpen={orgRailOpen}
        onToggleOrgRail={() => setOrgRailOpen((v) => !v)}
        width={navWidth}
        collapsed={navCollapsed}
        onToggleCollapsed={() =>
          setNavWidth(navCollapsed ? NAV_DEFAULT : NAV_COLLAPSED_WIDTH)
        }
        onResize={(e) =>
          startColumnResize(e, navWidth, setNavWidth, {
            threshold: NAV_COLLAPSE_THRESHOLD,
            collapsedWidth: NAV_COLLAPSED_WIDTH,
            min: NAV_MIN,
            max: NAV_MAX,
          })
        }
        theme={theme}
        onThemeChange={setTheme}
      />
      {hasListColumn(activeNav) && (
        <ListColumn
          label={listLabel}
          search={search}
          onSearchChange={setSearch}
          activeNav={activeNav}
          filter={filter}
          onFilterChange={setFilter}
          groupedFlowItems={groupedFlowItems}
          groupedChatItems={groupedChatItems}
          selectedItemId={openedConversation ?? selectedItemId}
          onSelect={(id) => {
            setSelectedItemId(id);
            setOpenedConversation(id);
            setMessages(
              activeNav === "chat" ? getChatConversation(id) : sampleConversation,
            );
          }}
          width={listWidth}
          collapsed={listCollapsed}
          onToggleCollapsed={() =>
            setListWidth(listCollapsed ? LIST_DEFAULT : LIST_COLLAPSED_WIDTH)
          }
          onResize={(e) =>
            startColumnResize(e, listWidth, setListWidth, {
              threshold: LIST_COLLAPSE_THRESHOLD,
              collapsedWidth: LIST_COLLAPSED_WIDTH,
              min: LIST_MIN,
              max: LIST_MAX,
            })
          }
        />
      )}
      <main className="flex-1 min-w-0 relative">
        {activeNav === "link" ? (
          <LinkPage />
        ) : activeNav === "memos" ? (
          <MemosPage />
        ) : activeNav === "followups" ? (
          <FollowUpsPage />
        ) : activeNav === "votes" ? (
          <VotesPage />
        ) : activeNav === "calendar" ? (
          <CalendarPage />
        ) : activeNav === "sop" ? (
          <PlaceholderPage title="SOP library" subtitle="Reusable procedures captured from flows" />
        ) : activeNav === "chat" ? (
          <ConversationView
            messages={messages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSend={handleChatSend}
            isChat
            chat={chatItems.find((c) => c.id === (openedConversation ?? "design-team"))}
            aiAssistantOpen={aiAssistantOpen}
            onToggleAiAssistant={() => {
              setAiAssistantOpen((v) => !v);
              if (membersPanelOpen) setMembersPanelOpen(false);
            }}
            membersPanelOpen={membersPanelOpen}
            onToggleMembersPanel={() => {
              setMembersPanelOpen((v) => !v);
              if (aiAssistantOpen) setAiAssistantOpen(false);
            }}
            onClose={() => {
              setOpenedConversation(null);
              setSelectedItemId(null);
            }}
          />
        ) : openedConversation && flowItems.find((f) => f.id === openedConversation) ? (
          <FlowDetailView
            detail={getFlowDetail(flowItems.find((f) => f.id === openedConversation)!)}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSend={handleChatSend}
            onClose={() => {
              setOpenedConversation(null);
              setSelectedItemId(null);
            }}
          />
        ) : (
          <EmptyTaskView
            value={taskInput}
            onChange={setTaskInput}
            onSubmit={handleTaskSubmit}
            suggestion={suggestedTasks[suggestionIdx]}
            onAllSops={() => handleNavSelect("sop")}
          />
        )}
      </main>
    </div>
  );
}

/* ===========================
 * Workspace rail (40px)
 * =========================== */
function TankaLogo({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 258 229"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72.5 228.126V187.545H0L72.5 228.126Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 130.784L257.778 130.733L257.766 187.546H0V130.784Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 65.8042H257.778V122.617H0V65.8042Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.874023H185.278V57.6868H0V0.874023Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WorkspaceRail({
  active,
  onSelect,
  onCollapse,
}: {
  active: string;
  onSelect: (id: string) => void;
  onCollapse: () => void;
}) {
  return (
    <aside className="w-10 shrink-0 bg-warm-bg border-r border-warm-gray-2 flex flex-col items-center pb-3 relative">
      <div className="h-[60px] w-full flex items-center justify-center shrink-0">
        <button
          onClick={onCollapse}
          className="w-7 h-7 flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 rounded-md transition-colors"
          title="Hide organizations"
        >
          <ChevronsLeft className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center gap-2 w-full">
        {workspaces.map((ws) => {
          const isActive = ws.id === active;
          return (
            <div
              key={ws.id}
              className="relative w-full flex items-center justify-center"
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-warm-black rounded-r-full" />
              )}
              <button
                onClick={() => onSelect(ws.id)}
                className={`relative w-[32px] h-[32px] rounded-[10px] flex items-center justify-center text-[11px] font-bold overflow-visible transition-all ${
                  isActive
                    ? "ring-2 ring-warm-black/25 shadow-[0_2px_6px_rgba(38,32,28,0.18)]"
                    : "opacity-55 hover:opacity-100"
                }`}
                style={
                  ws.avatar
                    ? undefined
                    : { background: ws.color, color: ws.textColor ?? "#fff" }
                }
                title={ws.name}
              >
                {ws.avatar ? (
                  <img
                    src={ws.avatar}
                    alt={ws.name}
                    className="w-full h-full rounded-[10px] object-cover"
                  />
                ) : (
                  ws.letter
                )}
                {ws.badge ? (
                  <span className="absolute -top-1 -right-1 z-10 bg-[#0891B2] text-white text-[9px] font-bold leading-none rounded-full min-w-[14px] h-[14px] px-[3px] flex items-center justify-center ring-2 ring-warm-bg">
                    {ws.badge}
                  </span>
                ) : null}
              </button>
            </div>
          );
        })}

        <div className="w-4 border-t border-warm-gray-2 my-1" />

        <button
          className="w-[32px] h-[32px] rounded-[10px] border-[1.5px] border-dashed border-warm-border flex items-center justify-center text-warm-2 hover:bg-warm-gray-2/60 hover:text-warm-black hover:border-warm-2 transition-colors"
          title="Add workspace"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <button
        className="w-[35px] h-[35px] rounded-lg flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/50"
        title="Settings"
      >
        <Settings className="w-4 h-4" strokeWidth={1.8} />
      </button>
    </aside>
  );
}

function navCreateMenu(itemId: string): MenuSection[] | null {
  switch (itemId) {
    case "flow":
      return [
        {
          title: "Create",
          items: [
            {
              id: "new-flow",
              label: "New flow",
              description: "Start a task with Tanka",
              icon: Workflow,
            },
            {
              id: "new-sop",
              label: "New SOP",
              description: "Capture a reusable procedure",
              icon: BookOpen,
            },
          ],
        },
      ];
    case "chat":
      return [
        {
          title: "Create",
          items: [
            { id: "new-chat", label: "New chat", icon: MessageSquare },
            { id: "new-group", label: "New group", icon: Users },
            { id: "new-broadcast", label: "New broadcast", icon: Megaphone },
          ],
        },
      ];
    case "memos":
      return [
        {
          items: [
            {
              id: "new-memo",
              label: "New memo",
              description: "Save a note",
              icon: FileText,
            },
          ],
        },
      ];
    case "followups":
      return [
        {
          items: [
            {
              id: "new-followup",
              label: "New follow-up",
              description: "Track something for later",
              icon: Flag,
            },
          ],
        },
      ];
    case "votes":
      return [
        {
          items: [
            {
              id: "new-vote",
              label: "New vote",
              description: "Ask the team to decide",
              icon: Vote,
            },
          ],
        },
      ];
    case "calendar":
      return [
        {
          items: [
            {
              id: "new-event",
              label: "New event",
              description: "Schedule a meeting",
              icon: Calendar,
            },
          ],
        },
      ];
    default:
      return null;
  }
}

function NavRow({
  icon: Icon,
  label,
  active,
  onClick,
  createMenu,
  indent,
  badgeCount,
}: {
  icon: NavIconComponent;
  label: string;
  active: boolean;
  onClick: () => void;
  createMenu?: MenuSection[] | null;
  indent?: boolean;
  badgeCount?: number;
}) {
  const showBadge = (badgeCount ?? 0) > 0;
  return (
    <div
      className={`group/nav relative w-[156px] mx-3 h-9 rounded-lg flex items-center text-[14px] font-medium transition-colors ${
        active ? "bg-warm-gray-2 text-warm-black" : "text-warm-black hover:bg-warm-gray-2/60"
      }`}
    >
      <button
        onClick={onClick}
        className={`flex-1 flex items-center gap-2.5 h-full min-w-0 ${
          indent ? "pl-7 pr-2" : createMenu ? "pl-2.5 pr-8" : "px-2.5"
        }`}
      >
        <span className="relative w-5 h-5 shrink-0 flex items-center justify-center text-warm-black">
          <Icon className="w-5 h-5" active={active} />
          {showBadge && (
            <span className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-[#dc2626] ring-2 ring-warm-bg" />
          )}
        </span>
        <span className="flex-1 text-left truncate">{label}</span>
      </button>

      {/* Right slot — + plus button */}
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
        {createMenu && (
          <DropdownTrigger sections={createMenu} align="right-of-trigger" width={240}>
            {({ open, toggle }) => (
              <button
                onClick={toggle}
                className={`pointer-events-auto h-5 rounded flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-bg overflow-hidden transition-all ${
                  open
                    ? "w-5 opacity-100 bg-warm-bg text-warm-black"
                    : "w-0 opacity-0 group-hover/nav:w-5 group-hover/nav:opacity-100"
                }`}
                title={`New ${label.toLowerCase()}`}
              >
                <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
              </button>
            )}
          </DropdownTrigger>
        )}
      </div>
    </div>
  );
}

/* ===========================
 * User menu (YG avatar) — popover with profile / plan / theme / sign out
 * =========================== */

type Theme = "light" | "dark";

function UserMenuButton({
  collapsed = false,
  theme,
  onThemeChange,
}: {
  collapsed?: boolean;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ left: number; bottom: number } | null>(null);

  const onOpen = () => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ left: r.left, bottom: window.innerHeight - r.top + 8 });
    setOpen(true);
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={onOpen}
        title="yiran guo"
        className={
          collapsed
            ? "rounded-full hover:opacity-90 transition-opacity"
            : "flex-1 min-w-0 h-9 flex items-center px-1 hover:opacity-90 transition-opacity"
        }
      >
        <span className="w-8 h-8 rounded-full bg-[#827d73] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
          YG
        </span>
      </button>
      {open && pos && (
        <UserMenuPopover
          left={pos.left}
          bottom={pos.bottom}
          theme={theme}
          onThemeChange={onThemeChange}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function UserMenuPopover({
  left,
  bottom,
  theme,
  onThemeChange,
  onClose,
}: {
  left: number;
  bottom: number;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  onClose: () => void;
}) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <>
      <div className="fixed inset-0 z-[100]" onClick={onClose} />
      <div
        role="menu"
        style={{ left, bottom }}
        className="fixed z-[101] w-[320px] rounded-2xl bg-white border border-warm-gray-2 shadow-[0_12px_32px_rgba(38,32,28,0.12)] overflow-hidden"
      >
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-[#827d73] text-white text-[14px] font-bold flex items-center justify-center shrink-0">
              YG
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-warm-black truncate">yiran guo</p>
              <p className="text-[13px] text-warm-2 truncate">yiran.guo@tanka.ai</p>
            </div>
          </div>
          <button className="mt-3 w-full h-10 rounded-lg border border-warm-gray-2 text-[14px] font-medium text-warm-black hover:bg-warm-base flex items-center justify-center gap-1.5 transition-colors">
            View Profile
            <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="border-t border-warm-gray-2 mx-4" />

        <div className="px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-warm-2 mb-2">
            Current Plan
          </p>
          <div className="rounded-lg bg-warm-base p-3 flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: STATUS.done.dot }}
            >
              <Zap className="w-[18px] h-[18px] text-white" strokeWidth={2} fill="white" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-warm-black">Pro Plan</p>
              <p className="text-[12px] text-warm-2">3 of 5 seats used</p>
            </div>
            <button
              className="text-[13px] font-medium"
              style={{ color: STATUS.done.label }}
            >
              Upgrade
            </button>
          </div>
        </div>

        <div className="border-t border-warm-gray-2 mx-4" />

        <div className="py-1.5">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 flex items-center gap-3 text-[14px] text-warm-black hover:bg-warm-base"
          >
            <CreditCard className="w-[18px] h-[18px] text-warm-2" strokeWidth={1.8} />
            Billing
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 flex items-center gap-3 text-[14px] text-warm-black hover:bg-warm-base"
          >
            <Settings className="w-[18px] h-[18px] text-warm-2" strokeWidth={1.8} />
            Settings
          </button>
          <div className="w-full px-4 py-2 flex items-center gap-3 text-[14px] text-warm-black">
            <Sun className="w-[18px] h-[18px] text-warm-2" strokeWidth={1.8} />
            <span className="flex-1">Appearance</span>
            <div className="flex items-center rounded-full bg-warm-base p-0.5">
              <button
                onClick={() => onThemeChange("light")}
                className={`px-2.5 py-1 rounded-full text-[12px] font-medium flex items-center gap-1 transition-colors ${
                  theme === "light" ? "bg-white text-warm-black shadow-sm" : "text-warm-2"
                }`}
                title="Light"
              >
                <Sun className="w-3.5 h-3.5" strokeWidth={1.8} />
                Light
              </button>
              <button
                onClick={() => onThemeChange("dark")}
                className={`px-2.5 py-1 rounded-full text-[12px] font-medium flex items-center gap-1 transition-colors ${
                  theme === "dark" ? "bg-white text-warm-black shadow-sm" : "text-warm-2"
                }`}
                title="Dark"
              >
                <Moon className="w-3.5 h-3.5" strokeWidth={1.8} />
                Dark
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-warm-gray-2 mx-4" />

        <div className="py-1.5">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 flex items-center gap-3 text-[14px] hover:bg-warm-base"
            style={{ color: STATUS.alert.label }}
          >
            <LogOut className="w-[18px] h-[18px]" strokeWidth={1.8} />
            Sign out
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}

/* ===========================
 * Nav sidebar (180px)
 * =========================== */
function NavSidebar({
  active,
  onSelect,
  workspace,
  orgRailOpen,
  onToggleOrgRail,
  width,
  collapsed,
  onToggleCollapsed,
  onResize,
  theme,
  onThemeChange,
}: {
  active: NavKey;
  onSelect: (k: NavKey) => void;
  workspace: WorkspaceItem;
  orgRailOpen: boolean;
  onToggleOrgRail: () => void;
  width: number;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onResize: (e: React.MouseEvent) => void;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  // Unread badge counts for nav items
  const chatUnread = chatItems.reduce(
    (sum, c) => sum + (c.unreadCount ?? (c.unread ? 1 : 0)),
    0,
  );
  const flowUnread = flowItems.filter((f) => f.unread).length;
  const navBadge: Partial<Record<string, number>> = {
    chat: chatUnread,
    flow: flowUnread,
  };

  if (collapsed)
    return (
      <NavSidebarCollapsed
        active={active}
        onSelect={onSelect}
        workspace={workspace}
        onExpand={onToggleCollapsed}
        onToggleOrgRail={onToggleOrgRail}
        onResize={onResize}
        theme={theme}
        onThemeChange={onThemeChange}
      />
    );

  return (
    <aside
      style={{ width }}
      className="group/navside relative shrink-0 bg-warm-bg border-r border-warm-gray-2 flex flex-col h-screen"
    >
      <div className="group/orghdr h-[60px] flex items-center px-2">
        {!orgRailOpen && (
          <button
            onClick={onToggleOrgRail}
            className="overflow-hidden h-7 w-0 opacity-0 group-hover/orghdr:w-7 group-hover/orghdr:opacity-100 group-hover/orghdr:mr-1 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-all duration-150 shrink-0"
            title="Show organizations"
          >
            <ChevronsRight className="w-4 h-4 shrink-0" strokeWidth={2} />
          </button>
        )}
        <div className="flex-1 min-w-0 flex items-center gap-2 px-1">
          {workspace.avatar ? (
            <img
              src={workspace.avatar}
              alt={workspace.name}
              className="w-6 h-6 rounded-md object-cover shrink-0"
            />
          ) : (
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{
                background: workspace.color,
                color: workspace.textColor ?? "#fff",
                border:
                  workspace.color.toLowerCase() === "#ffffff"
                    ? "1px solid var(--color-warm-gray-2)"
                    : undefined,
              }}
            >
              {workspace.letter}
            </span>
          )}
          <span className="text-[14px] font-medium text-warm-black truncate">
            {workspace.name}
          </span>
        </div>
      </div>

      <div className="border-t border-warm-gray-2 mx-3" />

      <nav className="flex-1 overflow-y-auto pt-3.5 scrollbar-thin">
        {navGroups.map((group, idx) => (
          <div key={group.id}>
            {idx > 0 && <div className="border-t border-warm-gray-2 mx-3 my-3.5" />}
            {group.label && (
              <p className="px-5 pb-1.5 text-[11px] font-medium text-warm-2 tracking-wide uppercase">
                {group.label}
              </p>
            )}
            <ul className="space-y-0">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] ?? iconMap.LayoutGrid;
                const isActive = item.id === active;
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <li key={item.id}>
                    <NavRow
                      icon={Icon}
                      label={item.label}
                      active={isActive}
                      onClick={() => onSelect(item.id as NavKey)}
                      createMenu={navCreateMenu(item.id)}
                      badgeCount={navBadge[item.id]}
                    />
                    {hasChildren && (
                      <ul className="mt-0.5">
                        {item.children!.map((child) => {
                          const ChildIcon = iconMap[child.icon] ?? iconMap.Box;
                          const isChildActive = child.id === active;
                          return (
                            <li key={child.id}>
                              <NavRow
                                icon={ChildIcon}
                                label={child.label}
                                active={isChildActive}
                                onClick={() => onSelect(child.id as NavKey)}
                                indent
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="h-[60px] flex items-center gap-1 px-2">
        <UserMenuButton theme={theme} onThemeChange={onThemeChange} />
        <button
          onClick={onToggleCollapsed}
          title="Hide navigation"
          className="w-7 h-7 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-opacity opacity-0 group-hover/navside:opacity-100 shrink-0"
        >
          <PanelLeftClose className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
      <div
        onMouseDown={onResize}
        title="Drag to resize"
        className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
      />
    </aside>
  );
}

function NavSidebarCollapsed({
  active,
  onSelect,
  workspace,
  onExpand,
  onToggleOrgRail,
  onResize,
  theme,
  onThemeChange,
}: {
  active: NavKey;
  onSelect: (k: NavKey) => void;
  workspace: WorkspaceItem;
  onExpand: () => void;
  onToggleOrgRail: () => void;
  onResize: (e: React.MouseEvent) => void;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const groupedFlat: { id: NavKey; label: string; icon: NavIconComponent }[][] = navGroups.map((g) => {
    const arr: { id: NavKey; label: string; icon: NavIconComponent }[] = [];
    for (const it of g.items) {
      arr.push({ id: it.id as NavKey, label: it.label, icon: iconMap[it.icon] ?? iconMap.LayoutGrid });
      if (it.children) {
        for (const c of it.children) {
          arr.push({ id: c.id as NavKey, label: c.label, icon: iconMap[c.icon] ?? iconMap.Box });
        }
      }
    }
    return arr;
  });

  return (
    <aside className="group/navside relative w-12 shrink-0 bg-warm-bg border-r border-warm-gray-2 flex flex-col h-screen items-center">
      <div className="h-[60px] flex items-center justify-center w-full">
        <button
          onClick={onToggleOrgRail}
          title={`Toggle organizations (${workspace.name})`}
          className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center text-[11px] font-bold hover:opacity-80 transition-opacity"
          style={
            workspace.avatar
              ? undefined
              : {
                  background: workspace.color,
                  color: workspace.textColor ?? "#fff",
                  border:
                    workspace.color.toLowerCase() === "#ffffff"
                      ? "1px solid var(--color-warm-gray-2)"
                      : undefined,
                }
          }
        >
          {workspace.avatar ? (
            <img
              src={workspace.avatar}
              alt={workspace.name}
              className="w-full h-full object-cover"
            />
          ) : (
            workspace.letter
          )}
        </button>
      </div>
      <div className="border-t border-warm-gray-2 w-full" />
      <nav className="flex-1 overflow-y-auto pt-3.5 scrollbar-thin w-full">
        {groupedFlat.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <div className="border-t border-warm-gray-2 mx-2 my-3.5" />}
            <ul className="space-y-0 flex flex-col items-center">
              {group.map((it) => {
                const isActive = it.id === active;
                return (
                  <li key={it.id}>
                    <button
                      onClick={() => onSelect(it.id)}
                      title={it.label}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-warm-black transition-colors ${
                        isActive
                          ? "bg-warm-gray-2"
                          : "hover:bg-warm-gray-2/60"
                      }`}
                    >
                      <it.icon className="w-5 h-5" active={isActive} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="pb-2 flex items-center justify-center">
        <button
          onClick={onExpand}
          title="Show menu"
          className="w-7 h-7 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-colors"
        >
          <PanelLeftOpen className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
      <div className="h-[60px] w-full flex items-center justify-center">
        <UserMenuButton collapsed theme={theme} onThemeChange={onThemeChange} />
      </div>
      <div
        onMouseDown={onResize}
        title="Drag to resize"
        className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
      />
    </aside>
  );
}

/* ===========================
 * List column (290px)
 * =========================== */
function ListColumn({
  label,
  search,
  onSearchChange,
  activeNav,
  filter,
  onFilterChange,
  groupedFlowItems,
  groupedChatItems,
  selectedItemId,
  onSelect,
  width,
  collapsed,
  onToggleCollapsed,
  onResize,
}: {
  label: string;
  search: string;
  onSearchChange: (s: string) => void;
  activeNav: NavKey;
  filter: FilterKey;
  onFilterChange: (f: FilterKey) => void;
  groupedFlowItems: Array<{ month: string; items: FlowItem[] }>;
  groupedChatItems: { pinned: ChatItem[]; today: ChatItem[] };
  selectedItemId: string | null;
  onSelect: (id: string) => void;
  width: number;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onResize: (e: React.MouseEvent) => void;
}) {
  if (collapsed) {
    return (
      <section className="relative w-11 shrink-0 bg-warm-bg-2 border-r border-warm-gray-2 flex flex-col items-center">
        <div className="h-[60px] flex items-center">
          <button
            onClick={onToggleCollapsed}
            title={`Show ${activeNav === "chat" ? "Chat" : "Flow"} list`}
            className="w-7 h-7 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-colors"
          >
            <ChevronsRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
        <div
          onMouseDown={onResize}
          title="Drag to resize"
          className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
        />
      </section>
    );
  }
  const filters: { id: FilterKey; label: string }[] =
    activeNav === "chat"
      ? [
          { id: "all", label: "Starred" },
          { id: "active", label: "Archived" },
          { id: "completed", label: "Groups" },
          { id: "foryou", label: "@" },
        ]
      : [
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "completed", label: "Completed" },
          { id: "foryou", label: "For you" },
        ];

  const newMenuSections: MenuSection[] =
    activeNav === "chat"
      ? [
          {
            title: "Create",
            items: [
              {
                id: "new-chat",
                label: "New chat",
                description: "Start a 1:1 conversation",
                icon: MessageSquare,
              },
              {
                id: "new-group",
                label: "New group",
                description: "Channel for a project or team",
                icon: Users,
              },
              {
                id: "new-broadcast",
                label: "New broadcast",
                description: "Announcement to many people",
                icon: Megaphone,
              },
            ],
          },
          {
            items: [
              { id: "new-folder", label: "New folder", icon: FolderPlus },
            ],
          },
        ]
      : [
          {
            title: "Create",
            items: [
              {
                id: "new-flow",
                label: "New flow",
                description: "Start a task with Tanka",
                icon: Workflow,
              },
              {
                id: "new-sop",
                label: "New SOP",
                description: "Capture a reusable procedure",
                icon: BookOpen,
              },
              {
                id: "new-agent",
                label: "New agent",
                description: "Specialized AI for recurring work",
                icon: Box,
              },
            ],
          },
        ];

  return (
    <section
      style={{ width }}
      className="relative shrink-0 bg-warm-bg-2 border-r border-warm-gray-2 flex flex-col h-screen"
    >
      <div className="px-3.5 pt-0">
        <div className="h-[60px] flex items-center justify-between">
          <h2 className="text-base font-medium tracking-tight">{label}</h2>
          <div className="flex items-center gap-1 text-warm-2">
            {activeNav === "chat" ? (
              <>
                <button
                  className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
                  title="Filter"
                >
                  <Atom className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </button>
                <button
                  className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
                  title="Members"
                >
                  <Users className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </button>
              </>
            ) : (
              <button
                className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
                title="Assets"
              >
                <Folder className="w-[18px] h-[18px]" strokeWidth={1.6} />
              </button>
            )}
            <DropdownTrigger sections={newMenuSections} align="right" width={240}>
              {({ open, toggle }) => (
                <button
                  onClick={toggle}
                  className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    open ? "bg-warm-gray-2 text-warm-black" : "hover:bg-warm-gray-2/60"
                  }`}
                  title="New"
                >
                  <Plus className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </button>
              )}
            </DropdownTrigger>
          </div>
        </div>

        <div className="h-9 mb-3 rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 transition-all focus-within:border-[#0891B2] focus-within:ring-2 focus-within:ring-teal-tint/60">
          <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
          />
        </div>
      </div>

      <div className="px-3.5 flex items-center gap-px mb-2">
        {filters.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className={`px-2.5 py-[5px] text-[12px] font-medium rounded-full transition-colors ${
                isActive
                  ? "bg-warm-base text-warm-black"
                  : "text-warm-2 hover:bg-warm-base/60"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin">
        {activeNav === "chat" ? (
          <>
            {groupedChatItems.pinned.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-warm-border font-medium px-1 pt-3 pb-2.5">
                  Pinned
                </div>
                <ul className="space-y-1">
                  {groupedChatItems.pinned.map((item) => (
                    <ChatRow
                      key={item.id}
                      item={item}
                      selected={selectedItemId === item.id}
                      onClick={() => onSelect(item.id)}
                    />
                  ))}
                </ul>
              </div>
            )}
            {groupedChatItems.today.length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] uppercase tracking-wider text-warm-border font-medium px-1 pt-1 pb-2.5">
                  Today
                </div>
                <ul className="space-y-1">
                  {groupedChatItems.today.map((item) => (
                    <ChatRow
                      key={item.id}
                      item={item}
                      selected={selectedItemId === item.id}
                      onClick={() => onSelect(item.id)}
                    />
                  ))}
                </ul>
              </div>
            )}
            {groupedChatItems.pinned.length === 0 &&
              groupedChatItems.today.length === 0 && <EmptyList />}
          </>
        ) : (
          <>
            {groupedFlowItems.length === 0 && <EmptyList />}
            {groupedFlowItems.map((group) => (
              <div key={group.month}>
                <div className="text-[11px] uppercase tracking-wider text-warm-border font-medium px-1 pt-3 pb-2.5">
                  {group.month}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isSelected = item.id === selectedItemId;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => onSelect(item.id)}
                          className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors relative ${
                            isSelected ? "" : "hover:bg-warm-base/60"
                          }`}
                          style={{
                            background: isSelected ? "#EAEFEE" : undefined,
                          }}
                        >
                          <div className="relative">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-[13px] truncate text-warm-black">
                                {item.title}
                              </p>
                              {item.unread && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                              )}
                            </div>
                            <p className="text-[12px] text-warm-2 truncate">{item.preview}</p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
      <div
        onMouseDown={onResize}
        title="Drag to resize"
        className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
      />
    </section>
  );
}

function GroupAvatar({
  color,
  size = 36,
}: {
  color: string;
  size?: number;
}) {
  // `size` is the TOTAL footprint so this aligns 1:1 with single-person
  // avatars in chat lists. The main solid circle sits at bottom-left,
  // a small ghost duplicate peeks out at top-right.
  const offset = Math.max(3, Math.round(size * 0.16));
  const inner = size - offset;
  const innerIcon = inner * 0.55;
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
    >
      {/* back ghost circle */}
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: inner,
          height: inner,
          background: color,
          opacity: 0.32,
          top: 0,
          right: 0,
        }}
      />
      {/* front solid circle */}
      <span
        className="absolute rounded-full flex items-center justify-center text-white"
        style={{
          width: inner,
          height: inner,
          background: color,
          bottom: 0,
          left: 0,
        }}
      >
        <Users
          style={{ width: innerIcon, height: innerIcon }}
          strokeWidth={2}
        />
      </span>
    </span>
  );
}

function ChatRow({
  item,
  selected,
  onClick,
}: {
  item: ChatItem;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full text-left rounded-lg px-3 py-2.5 flex gap-3 items-center transition-colors ${
          selected ? "bg-[#EAEFEE]" : "hover:bg-warm-base/60"
        }`}
      >
        {item.isGroup ? (
          <GroupAvatar color={item.avatarColor} size={36} />
        ) : item.avatarUrl ? (
          <img
            src={item.avatarUrl}
            alt={item.name}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
        ) : (
          <span
            className="w-9 h-9 rounded-full text-white text-[12px] font-semibold flex items-center justify-center shrink-0"
            style={{ background: item.avatarColor }}
          >
            {item.avatar}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[13px] truncate text-warm-black">{item.name}</p>
            <span className="text-[11px] text-warm-2 shrink-0">{item.time}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] text-warm-2 truncate">{item.preview}</p>
            {item.unreadCount ? (
              <span className="shrink-0 min-w-[16px] h-4 px-1 rounded-full bg-[#0891B2] text-white text-[10px] font-medium flex items-center justify-center tabular-nums leading-none">
                {item.unreadCount > 99 ? "99+" : item.unreadCount}
              </span>
            ) : item.unread ? (
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
            ) : null}
          </div>
        </div>
      </button>
    </li>
  );
}

function EmptyList() {
  return <div className="text-center text-warm-2 text-xs py-10">No results</div>;
}

/* ===========================
 * Main content - empty state
 * =========================== */
/* ===========================
 * Unified app rail (Tanka + 3rd party in one drawer)
 * =========================== */

type AppItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string; // icon stroke color
  navKey?: NavKey; // if set, clicking navigates to this nav
};

const PINNED_APPS: AppItem[] = [
  { id: "memo", label: "Memo", icon: FileText, color: "#f59e0b", navKey: "memos" },
  { id: "followup", label: "Follow-up", icon: Bell, color: "#a855f7", navKey: "followups" },
  { id: "vote", label: "Vote", icon: CheckSquare, color: "#10a37f", navKey: "votes" },
  { id: "calendar", label: "Calendar", icon: Calendar, color: "#2563eb", navKey: "calendar" },
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid, color: "#2563eb" },
  { id: "policy", label: "Policy", icon: BookOpen, color: "#dc2626" },
];

const ALL_APPS: AppItem[] = [
  ...PINNED_APPS,
  { id: "slack", label: "Slack", icon: MessageSquare, color: "#e01e5a" },
  { id: "zoom", label: "Zoom", icon: Video, color: "#2563eb" },
  { id: "notion", label: "Notion", icon: Layout, color: "#26201c" },
  { id: "jira", label: "Jira", icon: Briefcase, color: "#0d9488" },
  { id: "drive", label: "Drive", icon: Folder, color: "#eab308" },
  { id: "sheets", label: "Sheets", icon: Grid3X3, color: "#10a37f" },
];

function AppTile({
  app,
  size = 44,
  onClick,
}: {
  app: AppItem;
  size?: number;
  onClick?: () => void;
}) {
  const Icon = app.icon;
  return (
    <button
      onClick={onClick}
      title={app.label}
      className="group/app flex flex-col items-center gap-1.5 shrink-0 transition-transform hover:scale-105"
    >
      <span
        className="rounded-full bg-white flex items-center justify-center shadow-[0_1px_3px_rgba(38,32,28,0.04),0_0_0_1px_rgba(38,32,28,0.04)] group-hover/app:shadow-[0_2px_8px_rgba(38,32,28,0.08),0_0_0_1px_rgba(38,32,28,0.06)] transition-shadow"
        style={{ width: size, height: size }}
      >
        <Icon
          className="shrink-0"
          style={{ color: app.color, width: size * 0.5, height: size * 0.5 }}
          strokeWidth={1.6}
        />
      </span>
      <span className="text-[12px] text-warm-2 font-medium leading-none">
        {app.label}
      </span>
    </button>
  );
}

function AppRail({
  onAppClick,
  onShowAll,
}: {
  onAppClick: (app: AppItem) => void;
  onShowAll: () => void;
}) {
  return (
    <div className="flex items-start gap-5 overflow-x-auto pb-1 pl-1 pr-1 scrollbar-thin">
      {PINNED_APPS.map((app) => (
        <AppTile key={app.id} app={app} onClick={() => onAppClick(app)} />
      ))}
      <button
        onClick={onShowAll}
        title="All apps"
        className="group/all flex flex-col items-center gap-1.5 shrink-0 transition-transform hover:scale-105"
      >
        <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_1px_3px_rgba(38,32,28,0.04),0_0_0_1px_rgba(38,32,28,0.04)] group-hover/all:shadow-[0_2px_8px_rgba(38,32,28,0.08),0_0_0_1px_rgba(38,32,28,0.06)] transition-shadow">
          <Grid3X3 className="w-[22px] h-[22px] text-warm-2" strokeWidth={1.6} />
        </span>
        <span className="text-[12px] text-warm-2 font-medium leading-none">All</span>
      </button>
    </div>
  );
}

function AllAppsModal({
  onClose,
  onAppClick,
}: {
  onClose: () => void;
  onAppClick: (app: AppItem) => void;
}) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-warm-black/30 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[520px] rounded-2xl bg-white shadow-[0_24px_60px_rgba(38,32,28,0.18)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold tracking-tight">All Apps</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md text-warm-2 hover:text-warm-black hover:bg-warm-base flex items-center justify-center"
            title="Close"
          >
            <Check className="w-4 h-4 rotate-45 scale-0" />
            <span className="text-[20px] leading-none">×</span>
          </button>
        </div>
        <div className="px-6 pb-6 grid grid-cols-4 gap-x-4 gap-y-5">
          {ALL_APPS.map((app) => (
            <AppTile
              key={app.id}
              app={app}
              size={48}
              onClick={() => {
                onAppClick(app);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ===========================
 * Flow home feed (with app rail + SOPs + composer + flow list)
 * =========================== */

type FlowHomeTab = "active" | "complete" | "foryou";

function FlowHomeFeed({
  value,
  onChange,
  onSubmit,
  suggestion,
  onAllSops,
}: {
  value: string;
  onChange: (s: string) => void;
  onSubmit: () => void;
  suggestion: string;
  onAllSops?: () => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab" && !value) {
      e.preventDefault();
      onChange(suggestion);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  const featuredCards = SOP_CARDS.slice(0, 3);

  return (
    <div className="h-full w-full bg-warm-bg-2 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[740px] -mt-12">
        <h1 className="text-center text-[36px] leading-[40px] font-semibold tracking-tight mb-6">
          Your task today?
        </h1>

        <div
          className="rounded-3xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-4 transition-all focus-within:border-[#0891B2] focus-within:ring-4 focus-within:ring-teal-tint/60"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
          }}
        >
          <div className="relative min-h-[28px]">
            <textarea
              ref={inputRef}
              autoFocus
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              className="w-full bg-transparent text-[16px] leading-6 outline-none resize-none placeholder:text-transparent"
              placeholder="Start your task..."
            />
            {!value && (
              <div className="absolute left-0 top-0 flex items-center gap-2 pointer-events-none">
                <span className="text-warm-2 text-[16px]">Start your task...</span>
                <span className="bg-warm-base px-1.5 py-0.5 rounded text-[10px] font-semibold text-warm-2">
                  TAB
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1.5">
              <ComposerOutlineBtn title="Add content">
                <Plus className="w-4 h-4" strokeWidth={1.8} />
              </ComposerOutlineBtn>
              <ComposerOutlineBtn title="AI suggestions">
                <Sparkles className="w-4 h-4" strokeWidth={1.8} />
              </ComposerOutlineBtn>
            </div>
            <SendBtn onClick={onSubmit} disabled={!value.trim()} />
          </div>
        </div>

        {/* All SOPs section */}
        <div className="mt-8">
          <button
            onClick={onAllSops}
            className="flex items-center gap-1 text-[14px] font-semibold text-warm-black hover:text-warm-black/80 mb-3"
          >
            All SOPs
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </button>
          <div className="grid grid-cols-3 gap-3">
            {featuredCards.map((c) => (
              <SopMiniCard key={c.id} card={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SopMiniCard({ card }: { card: SopCard }) {
  const Icon = card.icon;
  return (
    <button className="text-left rounded-xl border border-warm-gray-2 bg-white p-3 flex items-start gap-3 hover:border-warm-border hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)] transition">
      <span className="w-9 h-9 rounded-lg bg-warm-base flex items-center justify-center shrink-0 text-warm-black">
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-warm-black truncate">{card.title}</p>
        <p className="text-[11.5px] text-warm-2 mt-0.5 line-clamp-1">{card.description}</p>
      </div>
    </button>
  );
}

function EmptyTaskView({
  value,
  onChange,
  onSubmit,
  suggestion,
  onAllSops,
}: {
  value: string;
  onChange: (s: string) => void;
  onSubmit: () => void;
  suggestion: string;
  onAllSops?: () => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab" && !value) {
      e.preventDefault();
      onChange(suggestion);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  const featuredCards = SOP_CARDS.slice(0, 3);

  return (
    <div className="h-full w-full bg-warm-bg-2 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[740px] -mt-12">
        <h1 className="text-center text-[36px] leading-[40px] font-semibold tracking-tight mb-6">
          Your task today?
        </h1>

        <div
          className="rounded-3xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-4"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
          }}
        >
          <div className="relative min-h-[28px]">
            <textarea
              ref={inputRef}
              autoFocus
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              className="w-full bg-transparent text-[16px] leading-6 outline-none resize-none placeholder:text-transparent"
              placeholder="Start your task..."
            />
            {!value && (
              <div className="absolute left-0 top-0 flex items-center gap-2 pointer-events-none">
                <span className="text-warm-2 text-[16px]">Start your task...</span>
                <span className="bg-warm-base px-1.5 py-0.5 rounded text-[10px] font-semibold text-warm-2">
                  TAB
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1.5">
              <ComposerOutlineBtn title="Add content">
                <Plus className="w-4 h-4" strokeWidth={1.8} />
              </ComposerOutlineBtn>
              <ComposerOutlineBtn title="AI suggestions">
                <Sparkles className="w-4 h-4" strokeWidth={1.8} />
              </ComposerOutlineBtn>
            </div>
            <SendBtn onClick={onSubmit} disabled={!value.trim()} />
          </div>
        </div>

        {/* All SOPs section */}
        <div className="mt-8">
          <button
            onClick={onAllSops}
            className="flex items-center gap-1 text-[14px] font-semibold text-warm-black hover:text-warm-black/80 mb-3"
          >
            All SOPs
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </button>
          <div className="grid grid-cols-3 gap-3">
            {featuredCards.map((c) => (
              <SopMiniCard key={c.id} card={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================
 * Members side panel (Feishu-style)
 * =========================== */
function MembersPanel({
  members,
  memberCount,
  groupName,
  onClose,
}: {
  members: GroupMember[];
  memberCount: number;
  groupName: string;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    (m.role ?? "").toLowerCase().includes(query.toLowerCase()),
  );
  const statusColor: Record<NonNullable<GroupMember["status"]>, string> = {
    online: "#10b981",
    away: "#f59e0b",
    offline: "#a1a1aa",
  };
  // Convention: first member is owner, second is admin (for the demo).
  const ownerId = members[0]?.id;
  const adminId = members[1]?.id;

  return (
    <aside className="w-[320px] shrink-0 border-l border-warm-gray-2 bg-warm-bg-2 flex flex-col">
      <div className="h-[60px] pl-[10px] pr-4 flex items-center gap-2 text-warm-black">
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-warm-gray-2/60 text-warm-2 hover:text-warm-black"
          title="Hide members"
        >
          <PanelLeftClose className="w-4 h-4" strokeWidth={1.8} />
        </button>
        <span className="text-[14px] font-medium">Members</span>
        <span className="text-[12px] text-warm-2">· {memberCount}</span>
      </div>

      <div className="px-4 pb-3">
        <div className="h-9 px-3 flex items-center gap-2 rounded-lg bg-white border border-warm-gray-2">
          <Search className="w-3.5 h-3.5 text-warm-2" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${groupName} members`}
            className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin">
        {filtered.map((m) => {
          const tag =
            m.id === ownerId ? "Owner" : m.id === adminId ? "Admin" : null;
          return (
            <li key={m.id}>
              <button className="w-full text-left rounded-lg px-2 py-2 flex items-center gap-2.5 hover:bg-warm-gray-2/40 transition-colors">
                <span className="relative shrink-0">
                  {m.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="w-8 h-8 rounded-full text-white text-[11px] font-semibold flex items-center justify-center"
                      style={{ background: m.avatarColor }}
                    >
                      {m.initials}
                    </span>
                  )}
                  {m.status && (
                    <span
                      className="absolute -bottom-0 -right-0 w-[9px] h-[9px] rounded-full ring-2 ring-warm-bg-2"
                      style={{ background: statusColor[m.status] }}
                    />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] text-warm-black truncate">{m.name}</p>
                    {tag && (
                      <span
                        className={`shrink-0 text-[10px] leading-none px-1.5 py-[3px] rounded bg-warm-base ${
                          tag === "Owner" ? "text-warm-black" : "text-warm-2"
                        }`}
                      >
                        {tag}
                      </span>
                    )}
                  </div>
                  {m.role && (
                    <p className="text-[11px] text-warm-2 truncate mt-0.5">{m.role}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="py-10 text-center text-[12px] text-warm-2">No matches</li>
        )}
      </ul>
    </aside>
  );
}

/* ===========================
 * Conversation view
 * =========================== */
function ConversationView({
  messages,
  chatInput,
  setChatInput,
  onSend,
  isChat,
  chat,
  aiAssistantOpen,
  onToggleAiAssistant,
  membersPanelOpen,
  onToggleMembersPanel,
  onClose,
}: {
  messages: ChatMessage[];
  chatInput: string;
  setChatInput: (s: string) => void;
  onSend: () => void;
  isChat: boolean;
  chat?: ChatItem;
  aiAssistantOpen: boolean;
  onToggleAiAssistant: () => void;
  membersPanelOpen: boolean;
  onToggleMembersPanel: () => void;
  onClose: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const headerName = isChat ? chat?.name ?? "Chat" : "New task";
  const isGroupChat = isChat && !!chat?.isGroup;
  const members = isGroupChat && chat ? getGroupMembers(chat.id) : [];
  const memberCount = chat?.memberCount ?? members.length;

  // Tone overrides (local to this view; cleared on chat switch by remount)
  const [messageTones, setMessageTones] = useState<
    Record<string, ChatMessage["tone"] | null>
  >({});
  // Reset when chat changes
  useEffect(() => {
    setMessageTones({});
  }, [chat?.id]);
  const [actionMenu, setActionMenu] = useState<
    { messageId: string; rect: DOMRect } | null
  >(null);
  const [highlightModal, setHighlightModal] = useState<{
    messageId: string;
  } | null>(null);

  const chatFades = useScrollFades<HTMLDivElement>([messages, chat?.id]);

  return (
    <div className="h-screen w-full flex bg-warm-bg-2">
      <div className="flex-1 min-w-0 flex flex-col">
      <div className="h-[60px] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          {isGroupChat && chat ? (
            <GroupAvatar color={chat.avatarColor} size={32} />
          ) : isChat && chat?.avatarUrl ? (
            <img
              src={chat.avatarUrl}
              alt={chat.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : isChat && chat ? (
            <span
              className="w-8 h-8 rounded-full text-white text-[12px] font-semibold flex items-center justify-center"
              style={{ background: chat.avatarColor }}
            >
              {chat.avatar}
            </span>
          ) : (
            <span className="w-8 h-8 rounded-full bg-[#7c6fb8] text-white text-[12px] font-semibold flex items-center justify-center">
              T
            </span>
          )}
          {isGroupChat ? (
            <div className="leading-tight min-w-0">
              <p className="text-base truncate">{headerName}</p>
              <button
                onClick={onToggleMembersPanel}
                title="View group members"
                className={`mt-0.5 -ml-1.5 self-start inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                  membersPanelOpen
                    ? "bg-warm-gray-2 text-warm-black"
                    : "text-warm-2 hover:bg-warm-base hover:text-warm-black"
                }`}
              >
                <Users className="w-3 h-3" strokeWidth={2} />
                <span className="tabular-nums">{memberCount} members</span>
              </button>
            </div>
          ) : (
            <div className="leading-tight min-w-0">
              <p className="text-base truncate">{headerName}</p>
              <p className="text-[11px] text-warm-2">
                {isChat ? "Online" : "Tanka assistant"}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-warm-2">
          <IconBtn title="Call">
            <Phone className="w-4 h-4" strokeWidth={1.8} />
          </IconBtn>
          <IconBtn title="Search">
            <Search className="w-4 h-4" strokeWidth={1.8} />
          </IconBtn>
          <IconBtn title="Filter">
            <ListFilter className="w-4 h-4" strokeWidth={1.8} />
          </IconBtn>
          <button
            onClick={onToggleAiAssistant}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-warm-base"
            title={aiAssistantOpen ? "Hide AI Assistant" : "Show AI Assistant"}
          >
            <SiriOrb />
          </button>
          {!isChat && (
            <button
              onClick={onClose}
              className="text-[12px] text-warm-2 hover:text-warm-black ml-2"
              title="Back"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        {/* Top gradient fade overlay — only when scroll is not at top */}
        {chatFades.fades.top && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-warm-bg-2 to-transparent z-10" />
        )}
        {/* Bottom gradient fade overlay — only when there's more below */}
        {chatFades.fades.bottom && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-warm-bg-2 to-transparent z-10" />
        )}
        {/* Scroll-to-bottom floating button */}
        {chatFades.fades.bottom && (
          <button
            onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
            title="Jump to latest"
            className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 w-8 h-8 rounded-full bg-white border border-warm-gray-2 shadow-[0_2px_8px_rgba(38,32,28,0.08)] text-warm-2 hover:text-warm-black hover:border-warm-border flex items-center justify-center transition-colors"
          >
            <ArrowDown className="w-4 h-4" strokeWidth={1.8} />
          </button>
        )}
        <div
          ref={chatFades.ref}
          onScroll={chatFades.onScroll}
          className="h-full overflow-y-auto px-8 py-6 scrollbar-thin scroll-smooth"
        >
          <div className="max-w-[768px] mx-auto px-3 space-y-6">
            {messages.map((m, idx) => (
              <Message
                key={m.id}
                message={m}
                prev={messages[idx - 1]}
                toneOverride={
                  m.id in messageTones ? messageTones[m.id] : undefined
                }
                onOpenMenu={
                  m.self
                    ? (id, rect) => setActionMenu({ messageId: id, rect })
                    : undefined
                }
              />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <div className="px-8 pb-6 pt-2">
        <div className="max-w-[768px] mx-auto">
          <div
            className="rounded-2xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-3 transition-all focus-within:border-[#0891B2] focus-within:ring-4 focus-within:ring-teal-tint/60"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
            }}
          >
            <div className="relative min-h-[24px]">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                rows={1}
                placeholder="Start your task..."
                className="w-full bg-transparent text-[15px] leading-6 outline-none resize-none placeholder:text-transparent"
              />
              {!chatInput && (
                <div className="absolute left-0 top-0 flex items-center gap-2 pointer-events-none">
                  <span className="text-warm-2 text-[15px]">Start your task...</span>
                  <span className="bg-warm-base px-1.5 py-0.5 rounded text-[10px] font-semibold text-warm-2">
                    TAB
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 h-8">
              <div className="flex items-center gap-1 text-warm-2">
                <ChatComposerAiBtn />
                <IconBtn title="Image">
                  <ImageIcon className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Files">
                  <Folder className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Snippet">
                  <Scissors className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Chart">
                  <BarChart3 className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Voice">
                  <Mic className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
              </div>
              <SendBtn onClick={onSend} disabled={!chatInput.trim()} />
            </div>
          </div>
        </div>
      </div>
      </div>
      {isChat && aiAssistantOpen && !membersPanelOpen && (
        <AIAssistantPanel onCollapse={onToggleAiAssistant} />
      )}
      {isChat && isGroupChat && membersPanelOpen && (
        <MembersPanel
          members={members}
          memberCount={memberCount}
          groupName={chat?.name ?? "Group"}
          onClose={onToggleMembersPanel}
        />
      )}
      {actionMenu && (
        <MessageActionMenu
          anchor={actionMenu.rect}
          onClose={() => setActionMenu(null)}
          onHighlight={() => {
            setHighlightModal({ messageId: actionMenu.messageId });
            setActionMenu(null);
          }}
        />
      )}
      {highlightModal && (
        <HighlightModal
          current={
            highlightModal.messageId in messageTones
              ? messageTones[highlightModal.messageId]
              : messages.find((m) => m.id === highlightModal.messageId)?.tone ?? null
          }
          onClose={() => setHighlightModal(null)}
          onApply={(tone) => {
            setMessageTones((prev) => ({
              ...prev,
              [highlightModal.messageId]: tone,
            }));
            setHighlightModal(null);
          }}
        />
      )}
    </div>
  );
}

function MessageActionMenu({
  anchor,
  onClose,
  onHighlight,
}: {
  anchor: DOMRect;
  onClose: () => void;
  onHighlight: () => void;
}) {
  if (typeof document === "undefined") return null;
  // Position to the LEFT of the anchor (the "..." button on hover toolbar)
  const top = anchor.bottom + 4;
  const left = Math.max(8, anchor.left - 180);
  const items = [
    { id: "reply", label: "Reply" },
    { id: "copy", label: "Copy Text" },
    { id: "followup", label: "Follow-up", trailing: ChevronRight },
    { id: "forward", label: "Forward" },
    { id: "pin", label: "Pin" },
    { id: "highlight", label: "Highlight" },
    { id: "select", label: "Select" },
    { id: "delete", label: "Delete" },
    { id: "vote", label: "Vote", trailing: ChevronRight },
    { id: "schedule", label: "Schedule Meeting" },
  ];
  return createPortal(
    <>
      <div className="fixed inset-0 z-[100]" onClick={onClose} />
      <div
        role="menu"
        style={{ top, left }}
        className="fixed z-[101] w-[200px] rounded-xl bg-white border border-warm-gray-2 shadow-[0_8px_24px_rgba(38,32,28,0.10)] py-1.5"
      >
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => {
              if (it.id === "highlight") onHighlight();
              else onClose();
            }}
            className="w-full px-4 py-2 text-left text-[14px] text-warm-black hover:bg-warm-base flex items-center justify-between"
          >
            <span>{it.label}</span>
            {it.trailing && (
              <it.trailing className="w-4 h-4 text-warm-2" strokeWidth={1.8} />
            )}
          </button>
        ))}
      </div>
    </>,
    document.body,
  );
}

function HighlightModal({
  current,
  onClose,
  onApply,
}: {
  current: ChatMessage["tone"] | null | undefined;
  onClose: () => void;
  onApply: (tone: ChatMessage["tone"] | null) => void;
}) {
  const [selected, setSelected] = useState<ChatMessage["tone"] | null>(
    current ?? null,
  );
  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-warm-black/30 p-6">
      <div
        className="w-full max-w-[560px] rounded-2xl bg-white shadow-[0_24px_60px_rgba(38,32,28,0.18)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight">Highlight</h2>
          <button
            onClick={onClose}
            title="Close"
            className="w-8 h-8 rounded-md text-warm-2 hover:text-warm-black hover:bg-warm-base flex items-center justify-center"
          >
            <span className="text-[20px] leading-none">×</span>
          </button>
        </div>
        <div className="px-6 pt-2 pb-4 grid grid-cols-2 gap-x-12 gap-y-7">
          {TONE_ORDER.map((t) => {
            const style = MESSAGE_TONE_STYLES[t];
            const isSelected = selected === t;
            return (
              <button
                key={t}
                onClick={() => setSelected(t)}
                className={`text-left rounded-xl p-2 transition-colors ${
                  isSelected
                    ? "bg-warm-base"
                    : "hover:bg-warm-base/60"
                }`}
              >
                <div className="relative pl-3 pt-1">
                  <span
                    className="absolute -top-1 left-0 text-[22px] leading-none z-10"
                    aria-hidden
                  >
                    {style.emoji}
                  </span>
                  <div
                    className="rounded-xl px-4 py-2.5 text-[15px] text-warm-black w-full"
                    style={{ background: style.bg }}
                  >
                    Hello~
                  </div>
                </div>
                <p className="text-[13px] text-warm-2 text-center mt-3">
                  {style.label}
                </p>
              </button>
            );
          })}
        </div>
        <div className="px-6 pb-5 flex items-center justify-end gap-2">
          {current && (
            <button
              onClick={() => onApply(null)}
              className="h-9 px-4 rounded-full text-[13px] text-warm-2 hover:text-warm-black hover:bg-warm-base"
            >
              Remove
            </button>
          )}
          <button
            onClick={() => selected && onApply(selected)}
            disabled={!selected}
            className={`h-9 px-5 rounded-full text-[13px] font-medium transition ${
              selected
                ? "bg-warm-black text-white hover:bg-warm-black/90"
                : "bg-warm-base text-warm-2 cursor-not-allowed"
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function SiriOrb() {
  return (
    <span
      className="block w-6 h-6 rounded-full bg-warm-black text-white flex items-center justify-center"
      style={{ boxShadow: "0 1px 3px rgba(38,32,28,0.18)" }}
      aria-hidden
    >
      <TankaLogo className="w-[11px] h-[10px]" />
    </span>
  );
}

function AIAssistantPanel({ onCollapse }: { onCollapse: () => void }) {
  const [msg, setMsg] = useState("");
  return (
    <aside className="w-[320px] shrink-0 border-l border-warm-gray-2 bg-warm-bg-2 flex flex-col">
      <div className="h-[60px] pl-[10px] pr-4 flex items-center gap-2 text-warm-black">
        <button
          onClick={onCollapse}
          className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-warm-gray-2/60 text-warm-2 hover:text-warm-black"
          title="Hide AI Assistant"
        >
          <PanelLeftClose className="w-4 h-4" strokeWidth={1.8} />
        </button>
        <span className="text-[14px] font-medium">AI Assistant</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin" />
      <div className="px-4 pb-6 pt-2">
        <div
          className="rounded-2xl border border-warm-gray-2 bg-white p-3 transition-all focus-within:border-[#0891B2] focus-within:ring-4 focus-within:ring-teal-tint/60"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
          }}
        >
          <div className="relative min-h-[24px]">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={1}
              placeholder="Type a message..."
              className="w-full bg-transparent text-[14px] leading-6 outline-none resize-none placeholder:text-warm-2"
            />
          </div>
          <div className="flex items-center justify-end mt-2 h-8">
            <SendBtn onClick={() => setMsg("")} disabled={!msg.trim()} />
          </div>
        </div>
      </div>
    </aside>
  );
}

const MESSAGE_TONE_STYLES: Record<
  NonNullable<ChatMessage["tone"]>,
  { bg: string; emoji: string; label: string }
> = {
  idea: { bg: "#fbe9c8", emoji: "💡", label: "Idea" },
  announce: { bg: "#e3dcce", emoji: "📣", label: "Announcement" },
  urgent: { bg: "#fbdcd2", emoji: "❗️", label: "Important" },
  celebrate: { bg: "#dde3cc", emoji: "🎉", label: "Celebration" },
};
const TONE_ORDER: Array<NonNullable<ChatMessage["tone"]>> = [
  "idea",
  "announce",
  "urgent",
  "celebrate",
];

function Message({
  message,
  prev,
  toneOverride,
  onOpenMenu,
}: {
  message: ChatMessage;
  prev?: ChatMessage;
  toneOverride?: ChatMessage["tone"] | null;
  onOpenMenu?: (id: string, rect: DOMRect) => void;
}) {
  if (message.self) {
    const effectiveTone =
      toneOverride === null ? null : toneOverride ?? message.tone ?? null;
    const toneStyle = effectiveTone ? MESSAGE_TONE_STYLES[effectiveTone] : null;
    return (
      <div className="flex flex-col items-end group/msg">
        <div className="relative max-w-[75%]">
          {toneStyle && (
            <span
              className="absolute -top-3 -left-2 text-[20px] leading-none select-none"
              aria-hidden
            >
              {toneStyle.emoji}
            </span>
          )}
          {/* Hover toolbar */}
          {onOpenMenu && (
            <button
              onClick={(e) => onOpenMenu(message.id, e.currentTarget.getBoundingClientRect())}
              title="More"
              className="opacity-0 group-hover/msg:opacity-100 transition-opacity absolute -left-9 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-white border border-warm-gray-2 shadow-sm flex items-center justify-center text-warm-2 hover:text-warm-black"
            >
              <MoreVertical className="w-3.5 h-3.5" strokeWidth={1.8} />
            </button>
          )}
          {toneStyle ? (
            // Toned bubble: time + read marks live inside the bubble at the bottom
            <div
              className="rounded-2xl px-4 py-3 text-[15px] leading-relaxed text-warm-black"
              style={{ background: toneStyle.bg }}
            >
              <span>{message.text}</span>
              <div className="mt-1 flex items-center justify-end gap-1">
                {message.time && (
                  <span className="text-[11px] text-warm-2">{message.time}</span>
                )}
                {message.read && (
                  <span className="text-[#1faa3a] text-[12px] leading-none font-bold tracking-tighter">
                    ✓✓
                  </span>
                )}
              </div>
            </div>
          ) : (
            // Default bubble: text only inside; time below
            <div className="rounded-2xl px-4 py-3 text-[15px] leading-relaxed bg-warm-base text-warm-black">
              {message.text}
            </div>
          )}
        </div>
        {!toneStyle && message.time && (
          <span className="text-[11px] text-warm-2 mt-1 mr-1">{message.time}</span>
        )}
      </div>
    );
  }
  const sameAuthor = prev && prev.author === message.author;
  return (
    <div className="flex gap-3">
      {!sameAuthor ? (
        <span
          className="w-8 h-8 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0 mt-1"
          style={{ background: message.authorColor ?? "#827d73" }}
        >
          {message.authorInitials}
        </span>
      ) : (
        <span className="w-8 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        {!sameAuthor && (
          <p className="text-[13px] font-semibold mb-1.5 text-warm-black">{message.author}</p>
        )}
        <div className="inline-block max-w-[85%] rounded-2xl bg-white border border-warm-gray-2 px-4 py-3 text-[15px] leading-relaxed text-warm-black">
          {message.text}
        </div>
        {message.time && (
          <p className="text-[11px] text-warm-2 mt-1 ml-1">{message.time}</p>
        )}
      </div>
    </div>
  );
}

function IconBtn({ children, title }: { children: ReactNode; title: string }) {
  return (
    <button
      title={title}
      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-warm-base text-warm-2 hover:text-warm-black"
    >
      {children}
    </button>
  );
}

// Tanka AI composer button — chat bubble with sparkle, rendered as a 30x30 SVG
// with a subtle off-white gradient body, light warm-gray border and gradient
// icon stroke. Used as the leftmost button in the chat composer.
function ChatComposerAiBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Tanka AI"
      className="group/ai relative w-[30px] h-[30px] shrink-0 rounded-lg flex items-center justify-center transition-all"
    >
      {/* Default state */}
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 transition-opacity group-hover/ai:opacity-0"
      >
        <mask id="ai-btn-mask" fill="white">
          <path d="M0 8.00001C0 3.58173 3.58172 0 8 0H21.6C26.0183 0 29.6 3.58172 29.6 8V21.6C29.6 26.0183 26.0183 29.6 21.6 29.6H8C3.58172 29.6 0 26.0183 0 21.6V8.00001Z" />
        </mask>
        <path
          d="M0 8.00001C0 3.58173 3.58172 0 8 0H21.6C26.0183 0 29.6 3.58172 29.6 8V21.6C29.6 26.0183 26.0183 29.6 21.6 29.6H8C3.58172 29.6 0 26.0183 0 21.6V8.00001Z"
          fill="url(#ai-btn-bg)"
        />
        <path
          d="M8 0V1H21.6V0V-1H8V0ZM29.6 8H28.6V21.6H29.6H30.6V8H29.6ZM21.6 29.6V28.6H8V29.6V30.6H21.6V29.6ZM0 21.6H1V8.00001H0H-1V21.6H0ZM8 29.6V28.6C4.13401 28.6 1 25.466 1 21.6H0H-1C-1 26.5706 3.02944 30.6 8 30.6V29.6ZM29.6 21.6H28.6C28.6 25.466 25.466 28.6 21.6 28.6V29.6V30.6C26.5706 30.6 30.6 26.5706 30.6 21.6H29.6ZM21.6 0V1C25.466 1 28.6 4.13401 28.6 8H29.6H30.6C30.6 3.02944 26.5706 -1 21.6 -1V0ZM8 0V-1C3.02944 -1 -1 3.02945 -1 8.00001H0H1C1 4.13401 4.13401 1 8 1V0Z"
          fill="#E5E3DB"
          mask="url(#ai-btn-mask)"
        />
        <g clipPath="url(#ai-btn-clip)">
          <path
            d="M8.22949 11.3707C8.22949 9.87804 9.43954 8.668 10.9322 8.668H14.716C15.0145 8.668 15.2565 8.91001 15.2565 9.20854C15.2565 9.50707 15.0145 9.74908 14.716 9.74908H10.9322C10.0366 9.74908 9.31058 10.4751 9.31058 11.3707V20.031L11.9901 18.0562H19.5809C20.4765 18.0562 21.2025 17.3302 21.2025 16.4346V14.614C21.2025 14.3154 21.4445 14.0734 21.743 14.0734C22.0416 14.0734 22.2836 14.3154 22.2836 14.614V16.4346C22.2836 17.9273 21.0735 19.1373 19.5809 19.1373H12.3458L8.22949 22.1699V11.3707Z"
            fill="url(#ai-btn-icon)"
          />
          <path
            d="M19.8994 7.58691C19.8994 8.20462 20.2213 8.87147 20.7362 9.39111C21.2506 9.91033 21.9169 10.2413 22.5538 10.2414V10.8784C21.9169 10.8785 21.2506 11.2095 20.7362 11.7287C20.2213 12.2483 19.8994 12.9152 19.8994 13.5329H19.2623C19.2623 12.9152 18.9404 12.2483 18.4256 11.7287C17.9111 11.2095 17.2448 10.8784 16.6079 10.8784V10.2414C17.2448 10.2414 17.9111 9.91033 18.4256 9.39111C18.9404 8.87147 19.2623 8.20463 19.2623 7.58691H19.8994Z"
            fill="url(#ai-btn-icon)"
          />
        </g>
        <defs>
          <linearGradient id="ai-btn-bg" x1="14.8" y1="0" x2="14.8" y2="29.6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCFCFA" />
            <stop offset="0.333333" stopColor="#FAF9F7" />
            <stop offset="0.666667" stopColor="#F7F7F3" />
            <stop offset="1" stopColor="#F5F4F0" />
          </linearGradient>
          <linearGradient id="ai-btn-icon" x1="15.3917" y1="7.58691" x2="15.3917" y2="22.1699" gradientUnits="userSpaceOnUse">
            <stop stopColor="#71717B" />
            <stop offset="1" stopColor="#E4E4E7" />
          </linearGradient>
          <clipPath id="ai-btn-clip">
            <rect width="16" height="16" fill="white" transform="translate(6.7998 6.7998)" />
          </clipPath>
        </defs>
      </svg>

      {/* Hover state — cyan border + cyan-tinted icon gradient */}
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-0 transition-opacity group-hover/ai:opacity-100"
      >
        <mask id="ai-btn-mask-hover" fill="white">
          <path d="M0 8.00001C0 3.58173 3.58172 0 8 0H21.6C26.0183 0 29.6 3.58172 29.6 8V21.6C29.6 26.0183 26.0183 29.6 21.6 29.6H8C3.58172 29.6 0 26.0183 0 21.6V8.00001Z" />
        </mask>
        <path
          d="M0 8.00001C0 3.58173 3.58172 0 8 0H21.6C26.0183 0 29.6 3.58172 29.6 8V21.6C29.6 26.0183 26.0183 29.6 21.6 29.6H8C3.58172 29.6 0 26.0183 0 21.6V8.00001Z"
          fill="url(#ai-btn-bg-hover)"
        />
        <path
          d="M8 0V1H21.6V0V-1H8V0ZM29.6 8H28.6V21.6H29.6H30.6V8H29.6ZM21.6 29.6V28.6H8V29.6V30.6H21.6V29.6ZM0 21.6H1V8.00001H0H-1V21.6H0ZM8 29.6V28.6C4.13401 28.6 1 25.466 1 21.6H0H-1C-1 26.5706 3.02944 30.6 8 30.6V29.6ZM29.6 21.6H28.6C28.6 25.466 25.466 28.6 21.6 28.6V29.6V30.6C26.5706 30.6 30.6 26.5706 30.6 21.6H29.6ZM21.6 0V1C25.466 1 28.6 4.13401 28.6 8H29.6H30.6C30.6 3.02944 26.5706 -1 21.6 -1V0ZM8 0V-1C3.02944 -1 -1 3.02945 -1 8.00001H0H1C1 4.13401 4.13401 1 8 1V0Z"
          fill="#0891B2"
          mask="url(#ai-btn-mask-hover)"
        />
        <g clipPath="url(#ai-btn-clip-hover)">
          <path
            d="M8.22949 11.3707C8.22949 9.87804 9.43954 8.668 10.9322 8.668H14.716C15.0145 8.668 15.2565 8.91001 15.2565 9.20854C15.2565 9.50707 15.0145 9.74908 14.716 9.74908H10.9322C10.0366 9.74908 9.31058 10.4751 9.31058 11.3707V20.031L11.9901 18.0562H19.5809C20.4765 18.0562 21.2025 17.3302 21.2025 16.4346V14.614C21.2025 14.3154 21.4445 14.0734 21.743 14.0734C22.0416 14.0734 22.2836 14.3154 22.2836 14.614V16.4346C22.2836 17.9273 21.0735 19.1373 19.5809 19.1373H12.3458L8.22949 22.1699V11.3707Z"
            fill="url(#ai-btn-icon-hover)"
          />
          <path
            d="M19.8994 7.58691C19.8994 8.20462 20.2213 8.87147 20.7362 9.39111C21.2506 9.91033 21.9169 10.2413 22.5538 10.2414V10.8784C21.9169 10.8785 21.2506 11.2095 20.7362 11.7287C20.2213 12.2483 19.8994 12.9152 19.8994 13.5329H19.2623C19.2623 12.9152 18.9404 12.2483 18.4256 11.7287C17.9111 11.2095 17.2448 10.8784 16.6079 10.8784V10.2414C17.2448 10.2414 17.9111 9.91033 18.4256 9.39111C18.9404 8.87147 19.2623 8.20463 19.2623 7.58691H19.8994Z"
            fill="url(#ai-btn-icon-hover)"
          />
        </g>
        <defs>
          <linearGradient id="ai-btn-bg-hover" x1="14.8" y1="0" x2="14.8" y2="29.6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCFCFA" />
            <stop offset="0.333333" stopColor="#FAF9F7" />
            <stop offset="0.666667" stopColor="#F7F7F3" />
            <stop offset="1" stopColor="#F5F4F0" />
          </linearGradient>
          <linearGradient id="ai-btn-icon-hover" x1="15.3917" y1="7.58691" x2="15.3917" y2="22.1699" gradientUnits="userSpaceOnUse">
            <stop stopColor="#279FBB" />
            <stop offset="1" stopColor="#E4E4E7" />
          </linearGradient>
          <clipPath id="ai-btn-clip-hover">
            <rect width="16" height="16" fill="white" transform="translate(6.7998 6.7998)" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

function ComposerOutlineBtn({
  children,
  title,
  onClick,
}: {
  children: ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-[30px] h-[30px] rounded-lg border border-warm-gray-2 flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
    >
      {children}
    </button>
  );
}

function SendBtn({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Send"
      className={`w-[30px] h-[30px] rounded-lg border flex items-center justify-center transition-colors ${
        disabled
          ? "bg-warm-border border-warm-border text-white cursor-not-allowed"
          : "bg-[#0891B2] border-[#0891B2] text-white hover:bg-[#0891B2]/85"
      }`}
    >
      <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.2} />
    </button>
  );
}

type MenuItem = {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  onClick?: () => void;
};

type MenuSection = {
  title?: string;
  items: MenuItem[];
};

type DropdownAlign = "left" | "right" | "right-of-trigger";

function DropdownPortal({
  triggerRect,
  onClose,
  align,
  width,
  sections,
}: {
  triggerRect: DOMRect;
  onClose: () => void;
  align: DropdownAlign;
  width: number;
  sections: MenuSection[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const gap = 6;
    let top = triggerRect.bottom + 4;
    let left: number;
    if (align === "right-of-trigger") {
      // Open to the right of the trigger (used for nav rows where space below is tight)
      top = triggerRect.top;
      left = triggerRect.right + gap;
    } else if (align === "left") {
      left = triggerRect.left;
    } else {
      // 'right' — right edge of dropdown aligns with right edge of trigger
      left = triggerRect.right - width;
    }
    // Clamp inside viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxLeft = vw - width - 8;
    left = Math.max(8, Math.min(left, maxLeft));
    const measuredH = ref.current?.offsetHeight ?? 220;
    if (top + measuredH > vh - 8) top = Math.max(8, vh - measuredH - 8);
    setCoords({ top, left });
  }, [triggerRect, align, width]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const scrollOrResize = () => onClose();
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", esc);
    window.addEventListener("scroll", scrollOrResize, true);
    window.addEventListener("resize", scrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", esc);
      window.removeEventListener("scroll", scrollOrResize, true);
      window.removeEventListener("resize", scrollOrResize);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{ width, top: coords.top, left: coords.left }}
      className="fixed z-[9999] bg-white rounded-xl border border-warm-gray-2 shadow-[0_4px_24px_rgba(38,32,28,0.08),0_1px_3px_rgba(38,32,28,0.06)] py-1.5"
    >
      {sections.map((sec, i) => (
        <div key={i} className={i > 0 ? "border-t border-warm-gray-2/60 mt-1 pt-1" : ""}>
          {sec.title && (
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-warm-2">
              {sec.title}
            </div>
          )}
          {sec.items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.id}
                onClick={() => {
                  it.onClick?.();
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-warm-base text-left transition-colors"
              >
                {Icon && (
                  <span className="w-6 h-6 rounded-md bg-warm-base flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-warm-2" strokeWidth={1.8} />
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-warm-black">{it.label}</p>
                  {it.description && (
                    <p className="text-[10px] text-warm-2">{it.description}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

type DropdownToggle = (e: React.MouseEvent) => void;

function DropdownTrigger({
  children,
  sections,
  align = "right",
  width = 220,
}: {
  children: (props: { open: boolean; toggle: DropdownToggle }) => React.ReactNode;
  sections: MenuSection[];
  align?: DropdownAlign;
  width?: number;
}) {
  const [open, setOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const toggle: DropdownToggle = (e) => {
    if (!open) {
      const target = e.currentTarget as HTMLElement;
      setTriggerRect(target.getBoundingClientRect());
    }
    setOpen((v) => !v);
  };

  return (
    <>
      {children({ open, toggle })}
      {typeof document !== "undefined" &&
        open &&
        triggerRect &&
        createPortal(
          <DropdownPortal
            triggerRect={triggerRect}
            onClose={() => setOpen(false)}
            align={align}
            width={width}
            sections={sections}
          />,
          document.body,
        )}
    </>
  );
}

/* ===========================
 * Flow detail view (rich content)
 * =========================== */
function PlaceholderPage({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2">
      <div className="h-[60px] px-6 flex items-center">
        <h1 className="text-[18px] font-medium tracking-tight">{title}</h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-12">
        <span className="w-12 h-12 rounded-2xl bg-warm-base flex items-center justify-center mb-3">
          <Sparkles className="w-5 h-5 text-warm-2" strokeWidth={1.8} />
        </span>
        <p className="text-[15px] font-medium text-warm-black mb-1">{title}</p>
        <p className="text-[13px] text-warm-2 max-w-[320px]">{subtitle}</p>
      </div>
    </div>
  );
}

/* ===========================
 * Link page (connector list)
 * =========================== */
/* ===========================
 * Follow-ups page
 * =========================== */

type FollowUpTab = "ongoing" | "verified" | "expired";
type FollowUpScope = "byyou" | "byothers" | "initiated";

type FollowUpItem = {
  id: string;
  title: string;
  source?: { type: "group" | "person"; name: string; avatarUrl?: string; color?: string; emoji?: string };
  accent: string; // left bar color
  unread?: boolean;
  group: string; // 'Today', 'Yesterday', '04/28/2026', etc.
};

const FOLLOWUP_ITEMS: FollowUpItem[] = [
  {
    id: "fu-1",
    title: "准备周会同步近期重点工作和后续需求",
    source: { type: "group", name: "Design Team", color: "#7c6fb8", emoji: "🪐" },
    accent: "#2563b8",
    group: "Today",
  },
  {
    id: "fu-2",
    title: "基于现有文件继续搭建 tanka web 方案",
    source: {
      type: "person",
      name: "Ling LV",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
    },
    accent: "#2563b8",
    group: "Yesterday",
  },
  {
    id: "fu-3",
    title: "111",
    accent: "#2563b8",
    group: "Yesterday",
  },
  {
    id: "fu-4",
    title: "在结构原型中考虑侧边栏创建入口快捷方式",
    source: {
      type: "person",
      name: "Ling LV",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
    },
    accent: "#c44a3a",
    unread: true,
    group: "Yesterday",
  },
  {
    id: "fu-5",
    title: "Ling LV: 本周新员工使用 Tanka 反馈汇总周报，请各模块负责同学重点关注 👇 https://me...",
    source: { type: "group", name: "Design Team", color: "#7c6fb8", emoji: "🪐" },
    accent: "#c44a3a",
    group: "04/28/2026",
  },
  {
    id: "fu-6",
    title: "复盘 Q2 上半季增长实验结果并提炼下一季假设",
    source: { type: "group", name: "Growth pod", color: "#f59e0b", emoji: "🌱" },
    accent: "#2563b8",
    group: "04/28/2026",
  },
  {
    id: "fu-7",
    title: "整理客户反馈中的高频问题并同步给产品",
    source: {
      type: "person",
      name: "Sarah Chen",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80",
    },
    accent: "#2563b8",
    group: "04/25/2026",
  },
];

function FollowUpsPage() {
  const [status, setStatus] = useState<"open" | "completed">("open");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const statusChips: Array<{ id: "open" | "completed"; label: string; count: number }> = [
    { id: "open", label: "Open", count: 10 },
    { id: "completed", label: "Completed", count: 22 },
  ];

  const items = FOLLOWUP_ITEMS.filter((i) => {
    if (!query.trim()) return true;
    return i.title.toLowerCase().includes(query.trim().toLowerCase());
  });

  // Group by .group field, in original order
  const grouped: Array<{ group: string; rows: FollowUpItem[] }> = [];
  for (const item of items) {
    const last = grouped[grouped.length - 1];
    if (last && last.group === item.group) {
      last.rows.push(item);
    } else {
      grouped.push({ group: item.group, rows: [item] });
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      <div className="h-[60px] shrink-0" />

      <div className="shrink-0">
        <div className="max-w-[1080px] mx-auto px-10">
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-[28px] font-bold tracking-tight">Follow-ups</h1>
            <div className="flex items-center gap-2 mt-1">
              {searchOpen ? (
                <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white transition-all focus-within:border-[#0891B2] focus-within:ring-2 focus-within:ring-teal-tint/60">
                  <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search..."
                    className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
              )}
              <button className="h-9 px-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0891B2] text-white text-[13px] font-medium hover:bg-[#0891B2]/90">
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                New Follow-up
              </button>
            </div>
          </div>
          <p className="text-[13px] text-warm-2 mb-5">
            Track action items captured from chats, meetings, and docs.
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              {statusChips.map((c) => {
                const isActive = status === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setStatus(c.id)}
                    className={`shrink-0 px-2.5 py-[5px] rounded-full text-[12px] font-medium transition-colors ${
                      isActive
                        ? "bg-warm-base text-warm-black"
                        : "text-warm-2 hover:bg-warm-base/60"
                    }`}
                  >
                    {c.label} ({c.count})
                  </button>
                );
              })}
              <button className="shrink-0 px-2.5 py-[5px] rounded-full text-[12px] font-medium text-warm-2 hover:bg-warm-base/60 inline-flex items-center gap-1">
                Priority
                <ChevronDown className="w-3 h-3" strokeWidth={1.8} />
              </button>
              <button className="shrink-0 px-2.5 py-[5px] rounded-full text-[12px] font-medium text-warm-2 hover:bg-warm-base/60 inline-flex items-center gap-1">
                Categorize
                <ChevronDown className="w-3 h-3" strokeWidth={1.8} />
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-[13px] text-warm-2 hover:text-warm-black">
              <ListTodo className="w-3.5 h-3.5" strokeWidth={1.8} />
              Select
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1080px] mx-auto px-10 pb-10">
          {grouped.map((g) => (
            <div key={g.group} className="mt-5">
              <p className="text-[12px] text-warm-2 mb-2.5">{g.group}</p>
              <div className="flex flex-col gap-2">
                {g.rows.map((it) => (
                  <FollowUpRow key={it.id} item={it} />
                ))}
              </div>
            </div>
          ))}
          {grouped.length === 0 && (
            <div className="text-center text-warm-2 text-[13px] py-20">
              Nothing to follow up on.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FollowUpRow({ item }: { item: FollowUpItem }) {
  return (
    <div className="relative rounded-xl border border-warm-gray-2 bg-white pl-5 pr-4 py-3 flex items-start gap-3 hover:border-[#0891B2] hover:bg-[#EBEEEE] hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)] transition">
      <span
        aria-hidden
        className="absolute left-2 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-full"
        style={{ background: item.accent }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-warm-black leading-relaxed truncate">
          {item.title}
        </p>
        {item.source && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-warm-2">
            {item.source.type === "person" && item.source.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.source.avatarUrl}
                alt={item.source.name}
                className="w-4 h-4 rounded-full object-cover"
              />
            ) : (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: item.source.color ?? "#7c6fb8" }}
              >
                <span className="leading-none">{item.source.emoji ?? "•"}</span>
              </span>
            )}
            <span>{item.source.name}</span>
          </div>
        )}
      </div>
      <div className="flex items-start gap-1 shrink-0 text-warm-2">
        <button
          title="Quick view"
          className="w-7 h-7 rounded-md bg-warm-gray-2/40 hover:bg-warm-gray-2 flex items-center justify-center"
        >
          <LayoutGrid className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
        <button
          title="More"
          className="w-7 h-7 rounded-md hover:bg-warm-base flex items-center justify-center"
        >
          <MoreVertical className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

/* ===========================
 * Votes page
 * =========================== */

type VoteTab = "ongoing" | "verified" | "expired";
type VoteScope = "byyou" | "byothers" | "initiated";

type VoteVoter = { id: string; initials: string; color: string; avatarUrl?: string };

type VoteCard = {
  id: string;
  author: { name: string; avatarUrl: string };
  question: string;
  reply: string;
  voted: { total: number; max: number };
  voters: VoteVoter[];
  verification: {
    status: "Agree" | "Disagree";
    label: string;
    by: VoteVoter;
  };
  execution: {
    label: "Done" | "In progress" | "Idle";
    by: VoteVoter;
  };
  group: string; // e.g. "报销-XXX"
  timestamp: string; // "04/29/2026 4:56 PM"
  date: string; // grouping date
  scope: VoteTab;
};

const VOTERS_POOL: VoteVoter[] = [
  { id: "a", initials: "A", color: "#2563b8" },
  { id: "ds", initials: "DS", color: "#bdbbaf", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80" },
  { id: "li", initials: "LI", color: "#10a37f" },
  { id: "gz", initials: "GZ", color: "#3a8a5e" },
];

const VOTE_CARDS: VoteCard[] = [
  {
    id: "v1",
    author: { name: "Ling LV", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80" },
    question: "Ling LV: Tanka iOS v3.2 终稿今天能 lock 吗?",
    reply: "Yiran GUO: 我再确认下 dark mode 截图",
    voted: { total: 5, max: 5 },
    voters: VOTERS_POOL,
    verification: {
      status: "Agree",
      label: "Let's move forward",
      by: { id: "lv", initials: "LV", color: "#bdbbaf", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80" },
    },
    execution: { label: "Done", by: { id: "yl", initials: "YL", color: STATUS.done.dot } },
    group: "报销-XXX",
    timestamp: "04/29/2026 4:56 PM",
    date: "04/29/2026",
    scope: "ongoing",
  },
  {
    id: "v2",
    author: { name: "Xinran LI", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" },
    question: "Xinran LI: F12 sub nav 这版交互稿，能交叉 review 一下吗?",
    reply: "Yiran GUO: 好的，今晚给你回",
    voted: { total: 5, max: 5 },
    voters: VOTERS_POOL,
    verification: {
      status: "Agree",
      label: "Let's move forward",
      by: { id: "xl", initials: "XL", color: "#bdbbaf", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" },
    },
    execution: { label: "Done", by: { id: "yl", initials: "YL", color: STATUS.done.dot } },
    group: "报销-XXX",
    timestamp: "04/29/2026 3:12 PM",
    date: "04/29/2026",
    scope: "ongoing",
  },
  {
    id: "v3",
    author: { name: "Yichun HAN", avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&q=80" },
    question: "Yichun HAN: 新版 onboarding 流程图周三下午能 sync 吗?",
    reply: "Yiran GUO: 周三 4 点没问题",
    voted: { total: 5, max: 5 },
    voters: VOTERS_POOL,
    verification: {
      status: "Agree",
      label: "Let's move forward",
      by: { id: "yh", initials: "YH", color: "#bdbbaf", avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&q=80" },
    },
    execution: { label: "Done", by: { id: "yl", initials: "YL", color: STATUS.done.dot } },
    group: "报销-XXX",
    timestamp: "04/29/2026 11:48 AM",
    date: "04/29/2026",
    scope: "ongoing",
  },
  {
    id: "v4",
    author: { name: "Adam Liu", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" },
    question: "Adam Liu: Q1 OKR review 周五上午十点定下来吗?",
    reply: "Yiran GUO: 周五上午十点 OK",
    voted: { total: 4, max: 4 },
    voters: VOTERS_POOL.slice(0, 4),
    verification: {
      status: "Agree",
      label: "Verified",
      by: { id: "al", initials: "AL", color: "#bdbbaf", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" },
    },
    execution: { label: "Done", by: { id: "yl", initials: "YL", color: STATUS.done.dot } },
    group: "Roadmap-Q2",
    timestamp: "04/27/2026 5:31 PM",
    date: "04/27/2026",
    scope: "verified",
  },
  {
    id: "v5",
    author: { name: "Hua Zhang", avatarUrl: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=80&h=80&fit=crop&q=80" },
    question: "Hua Zhang: 监控告警上线时间窗口需要再 confirm 一次吗?",
    reply: "Yiran GUO: 时间窗口已过期，重新发起一票",
    voted: { total: 2, max: 5 },
    voters: VOTERS_POOL.slice(0, 2),
    verification: {
      status: "Disagree",
      label: "Time-out — needs re-vote",
      by: { id: "hz", initials: "HZ", color: "#bdbbaf", avatarUrl: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=80&h=80&fit=crop&q=80" },
    },
    execution: { label: "Idle", by: { id: "yl", initials: "YL", color: STATUS.idle.dot } },
    group: "Ops-monitor",
    timestamp: "04/20/2026 9:02 AM",
    date: "04/20/2026",
    scope: "expired",
  },
];

function VotesPage() {
  const [tab, setTab] = useState<VoteTab>("ongoing");
  const [scope, setScope] = useState<VoteScope>("byyou");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const tabs: Array<{ id: VoteTab; label: string; count: number }> = [
    { id: "ongoing", label: "Ongoing", count: 3 },
    { id: "verified", label: "Verified", count: 1 },
    { id: "expired", label: "Expired", count: 1 },
  ];
  const scopes: Array<{ id: VoteScope; label: string; count: number }> = [
    { id: "byyou", label: "By you", count: 3 },
    { id: "byothers", label: "By others", count: 0 },
    { id: "initiated", label: "Initiated by you", count: 0 },
  ];

  const items = VOTE_CARDS.filter((v) => {
    if (v.scope !== tab) return false;
    if (!query.trim()) return true;
    return (v.question + v.reply).toLowerCase().includes(query.trim().toLowerCase());
  });

  const grouped: Array<{ date: string; rows: VoteCard[] }> = [];
  for (const v of items) {
    const last = grouped[grouped.length - 1];
    if (last && last.date === v.date) last.rows.push(v);
    else grouped.push({ date: v.date, rows: [v] });
  }

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      <div className="h-[60px] shrink-0" />

      <div className="shrink-0">
        <div className="max-w-[1080px] mx-auto px-10">
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-[28px] font-bold tracking-tight">Votes</h1>
            <div className="flex items-center gap-2 mt-1">
              {searchOpen ? (
                <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white transition-all focus-within:border-[#0891B2] focus-within:ring-2 focus-within:ring-teal-tint/60">
                  <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search votes..."
                    className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
              )}
              <button className="h-9 px-4 inline-flex items-center gap-1.5 rounded-lg border border-warm-gray-2 bg-white text-[13px] font-medium text-warm-black hover:bg-warm-base">
                <Download className="w-3.5 h-3.5" strokeWidth={1.8} />
                Export
              </button>
              <button className="h-9 px-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0891B2] text-white text-[13px] font-medium hover:bg-[#0891B2]/90">
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                New Vote
              </button>
            </div>
          </div>
          <p className="text-[13px] text-warm-2 mb-5">
            Approve and verify decisions with quick polls.
          </p>

          <div className="border-b border-warm-gray-2 flex gap-6 mb-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative py-2.5 text-[14px] transition-colors ${
                  tab === t.id ? "text-warm-black font-semibold" : "text-warm-2 hover:text-warm-black"
                }`}
              >
                {t.label}{" "}
                <span className={tab === t.id ? "text-warm-2 font-normal" : ""}>({t.count})</span>
                {tab === t.id && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0891B2]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 mb-3">
            {scopes.map((s) => (
              <button
                key={s.id}
                onClick={() => setScope(s.id)}
                className={`shrink-0 px-2.5 py-[5px] rounded-full text-[12px] font-medium transition-colors ${
                  scope === s.id
                    ? "bg-warm-base text-warm-black"
                    : "text-warm-2 hover:bg-warm-base/60"
                }`}
              >
                {s.label} ({s.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1080px] mx-auto px-10 pb-10">
          {grouped.length > 0 ? (
            grouped.map((g) => (
              <div key={g.date} className="mb-6">
                <p className="text-[12px] text-warm-2 mb-3">{g.date}</p>
                <div className="grid grid-cols-3 gap-3">
                  {g.rows.map((v) => (
                    <VoteCardView key={v.id} vote={v} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-warm-2 text-[13px] py-20">No votes here yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function VoteAvatar({ voter, size = 22 }: { voter: VoteVoter; size?: number }) {
  if (voter.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={voter.avatarUrl}
        alt={voter.initials}
        style={{ width: size, height: size }}
        className="rounded-full object-cover ring-2 ring-white shrink-0"
      />
    );
  }
  return (
    <span
      className="rounded-full ring-2 ring-white flex items-center justify-center text-white text-[10px] font-semibold shrink-0"
      style={{ width: size, height: size, background: voter.color }}
    >
      {voter.initials}
    </span>
  );
}

function VoteCardView({ vote }: { vote: VoteCard }) {
  const verifyDone = vote.verification.status === "Agree";
  const verifyStyle = verifyDone ? STATUS.done : STATUS.alert;
  const execStyle =
    vote.execution.label === "Done"
      ? STATUS.done
      : vote.execution.label === "In progress"
      ? STATUS.active
      : STATUS.idle;

  return (
    <div className="rounded-xl border border-warm-gray-2 bg-white p-4 flex flex-col gap-3 hover:border-[#0891B2] hover:bg-[#EBEEEE] hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)] transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vote.author.avatarUrl}
            alt={vote.author.name}
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <span className="text-[14px] font-semibold text-warm-black truncate">
            {vote.author.name}
          </span>
        </div>
        <button className="w-6 h-6 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base">
          <MoreVertical className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      </div>

      {/* Quoted question + reply */}
      <div className="border-l-2 border-warm-gray-2 pl-3 text-[12.5px] leading-relaxed text-warm-2 space-y-1">
        <p className="line-clamp-2">{vote.question}</p>
        <p className="line-clamp-2">{vote.reply}</p>
      </div>

      {/* Voted indicator */}
      <p className="text-[11.5px] text-warm-2 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-warm-2" />
        {vote.voted.total} of {vote.voted.max} voted
      </p>

      {/* Vote rows */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-warm-black flex items-center gap-2">
            <span>👍</span>
            <span>Upvote</span>
          </span>
          <div className="flex -space-x-1.5">
            {vote.voters.map((v) => (
              <VoteAvatar key={v.id} voter={v} size={20} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-warm-black flex items-center gap-2">
            <span>👎</span>
            <span>Downvote</span>
          </span>
        </div>
      </div>

      {/* Verification */}
      <div>
        <p className="text-[11.5px] text-warm-2 flex items-center gap-1.5 mb-1.5">
          <span className="w-1 h-1 rounded-full bg-warm-2" />
          Verification
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="px-2 py-0.5 rounded-md text-[11.5px] font-medium shrink-0"
              style={{ background: verifyStyle.tint, color: verifyStyle.label }}
            >
              {vote.verification.status}
            </span>
            <span className="text-[12.5px] text-warm-black truncate">{vote.verification.label}</span>
          </div>
          <VoteAvatar voter={vote.verification.by} size={20} />
        </div>
      </div>

      {/* Execution */}
      <div>
        <p className="text-[11.5px] text-warm-2 flex items-center gap-1.5 mb-1.5">
          <span className="w-1 h-1 rounded-full bg-warm-2" />
          Execution
        </p>
        <div className="flex items-center justify-between">
          <span
            className="px-2 py-0.5 rounded-md text-[11.5px] font-medium"
            style={{ background: execStyle.tint, color: execStyle.label }}
          >
            {vote.execution.label}
          </span>
          <VoteAvatar voter={vote.execution.by} size={20} />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-warm-gray-2 pt-2.5 flex items-center justify-between text-[11.5px] text-warm-2">
        <span className="flex items-center gap-1.5 truncate">
          <Users className="w-3.5 h-3.5" strokeWidth={1.8} />
          <span className="truncate">{vote.group}</span>
        </span>
        <span className="flex items-center gap-1.5 shrink-0">
          <Vote className="w-3.5 h-3.5" strokeWidth={1.8} />
          {vote.timestamp}
        </span>
      </div>
    </div>
  );
}

/* ===========================
 * Memos page
 * =========================== */

type MemoSection =
  | "home"
  | "meeting"
  | "shared"
  | "collab"
  | "wiki"
  | "tanka"
  | "11";

type MemoTab = "created" | "recent" | "favorites";

type MemoTag = { label: string; tint: string; label_color: string };

type MemoItem = {
  id: string;
  title: string;
  body: string;
  date: string;
  tags?: MemoTag[];
};

const MEMO_TAG_GREEN: MemoTag = { label: "Tag", tint: "#dde5d3", label_color: "#3a6a4e" };

const MEMO_ITEMS: MemoItem[] = [
  {
    id: "m1",
    title: "Test",
    body: "testtesttesttesttesttesttest",
    date: "05/09/2026",
    tags: [
      { label: "Organizational Structure", tint: "#d3e5e2", label_color: "#2c6a6c" },
      { label: "Policy & Guidance", tint: "#d3e5e2", label_color: "#2c6a6c" },
      { label: "Company Profile", tint: "#d3e5e2", label_color: "#2c6a6c" },
    ],
  },
  {
    id: "m2",
    title: "设计需求推进群聊模版",
    body:
      "设计需求推进群聊模版 1. 目的 规范设计需求推荐到群聊中的流程，确保需求信息清晰、推荐对象准确、后续跟进可追踪。 2. 适用范围 适用于需要将设计相关需求、任务、讨论或资源推进到指定群聊的场景。 3. 角...",
    date: "05/09/2026",
  },
  {
    id: "m3",
    title: "设计方案阐述模版 SOP",
    body:
      "设计方案阐述模版 SOP 1. 目的 规范设计方案在群聊、评审或文档中的阐述方式，帮助团队快速理解设计背景、目标、思路和关键调整点，提升沟通效率与评审质量。 2. 适用范围 适用于以下场景： 在群聊中同步...",
    date: "05/09/2026",
  },
];

function MemosPage() {
  const [section, setSection] = useState<MemoSection>("home");
  const [tab, setTab] = useState<MemoTab>("created");
  const [notebooksOpen, setNotebooksOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navItems: Array<{ id: MemoSection; label: string; icon: LucideIcon; count?: number }> = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "meeting", label: "Meeting", icon: Mic },
    { id: "shared", label: "Shared with You", icon: Share2, count: 158 },
    { id: "collab", label: "Collaboration", icon: Users, count: 1 },
    { id: "wiki", label: "Team Wiki", icon: BookOpen },
  ];

  const notebooks: Array<{ id: MemoSection; label: string; count?: number }> = [
    { id: "tanka", label: "tanka", count: 1 },
    { id: "11", label: "11" },
  ];

  const tabs: Array<{ id: MemoTab; label: string; count: number }> = [
    { id: "created", label: "Created by you", count: 3 },
    { id: "recent", label: "Recent", count: 15 },
    { id: "favorites", label: "Favorites", count: 0 },
  ];

  const items = MEMO_ITEMS.filter((m) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return m.title.toLowerCase().includes(q) || m.body.toLowerCase().includes(q);
  });

  return (
    <div className="h-screen w-full flex bg-warm-bg-2">
      {/* Sub-nav (same width as global list column: 290px) */}
      <aside className="w-[290px] shrink-0 bg-warm-bg-2 border-r border-warm-gray-2 flex flex-col">
        <div className="h-[18px] shrink-0" />
        <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin">
          <ul className="space-y-0.5">
            {navItems.map((it) => (
              <li key={it.id}>
                <MemoNavRow
                  icon={it.icon}
                  label={it.label}
                  count={it.count}
                  active={section === it.id}
                  onClick={() => setSection(it.id)}
                />
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <div className="group/nb px-2 mb-1 flex items-center justify-between">
              <button
                onClick={() => setNotebooksOpen((v) => !v)}
                className="flex items-center gap-1 text-[12px] font-medium text-warm-2 hover:text-warm-black"
              >
                Notebooks
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${notebooksOpen ? "" : "-rotate-90"}`}
                  strokeWidth={2}
                />
              </button>
              <button
                className="w-5 h-5 rounded flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base opacity-0 group-hover/nb:opacity-100 transition-opacity"
                title="Add notebook"
              >
                <Plus className="w-3 h-3" strokeWidth={2} />
              </button>
            </div>
            {notebooksOpen && (
              <ul className="space-y-0.5">
                {notebooks.map((nb) => (
                  <li key={nb.id}>
                    <MemoNavRow
                      icon={Folder}
                      label={nb.label}
                      count={nb.count}
                      active={section === nb.id}
                      onClick={() => setSection(nb.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="border-t border-warm-gray-2 px-3 py-3 shrink-0">
          <MemoNavRow icon={Trash2} label="Trash" />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="h-[18px] shrink-0" />
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
          <div className="max-w-[1080px] mx-auto px-10 pb-10">
            <div className="h-9 flex items-center justify-between mb-1">
              <h1 className="text-[28px] font-bold tracking-tight leading-none">Memos</h1>
              <div className="flex items-center gap-2">
                {searchOpen ? (
                  <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white transition-all focus-within:border-[#0891B2] focus-within:ring-2 focus-within:ring-teal-tint/60">
                    <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onBlur={() => !query && setSearchOpen(false)}
                      placeholder="Search memos..."
                      className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                    title="Search"
                  >
                    <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  </button>
                )}
                <button className="h-9 px-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0891B2] text-white text-[13px] font-medium hover:bg-[#0891B2]/90">
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  New Memo
                </button>
              </div>
            </div>
            <p className="text-[13px] text-warm-2 mb-5">
              Notes, drafts, and meeting captures.
            </p>

            <div className="border-b border-warm-gray-2 flex items-end justify-between mb-5">
              <div className="flex gap-6">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative py-2.5 text-[14px] transition-colors ${
                      tab === t.id ? "text-warm-black font-semibold" : "text-warm-2 hover:text-warm-black"
                    }`}
                  >
                    {t.label}{" "}
                    <span className={tab === t.id ? "text-warm-2 font-normal" : ""}>({t.count})</span>
                    {tab === t.id && (
                      <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0891B2]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 pb-1.5">
                <button
                  title="Select"
                  className="w-7 h-7 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                >
                  <ListTodo className="w-4 h-4" strokeWidth={1.8} />
                </button>
                <button
                  title="Filter"
                  className="w-7 h-7 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                >
                  <Filter className="w-4 h-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <ul>
              {items.map((m, idx) => (
                <li key={m.id} className="border-b border-warm-gray-2 last:border-b-0">
                  <button className="w-full text-left py-4 hover:bg-warm-base/40 -mx-2 px-2 rounded-md transition-colors">
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <p className="text-[14px] font-medium text-warm-black truncate">{m.title}</p>
                      <span className="text-[12px] text-warm-2 shrink-0">{m.date}</span>
                    </div>
                    <p className="text-[13px] text-warm-2 line-clamp-2">{m.body}</p>
                    {m.tags && m.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.tags.map((t) => (
                          <span
                            key={t.label}
                            className="px-2 py-0.5 rounded-full text-[11.5px] font-medium"
                            style={{ background: t.tint, color: t.label_color }}
                          >
                            {t.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function MemoNavRow({
  icon: Icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group/mr w-full h-9 px-2 rounded-lg flex items-center gap-2 text-[14px] transition-colors ${
        active
          ? "bg-[#EAEFEE] text-warm-black font-medium"
          : "text-warm-black hover:bg-warm-base/60"
      }`}
    >
      <Icon
        className="w-[18px] h-[18px] shrink-0"
        style={{ color: active ? "#26201c" : "#56534E" }}
        strokeWidth={1.6}
      />
      <span className="flex-1 text-left truncate">{label}</span>
      {count !== undefined && (
        <span className="text-[12px] text-warm-2 shrink-0 tabular-nums">{count}</span>
      )}
    </button>
  );
}

/* ===========================
 * Agent page
 * =========================== */

type AgentStatus = "READY" | "PAUSED";

type AgentSpec = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  count?: number;
  status: AgentStatus;
};

const AGENTS: AgentSpec[] = [
  { id: "email", name: "Email Agent", description: "Triage inboxes, classify, draft replies, and follow up.", icon: Mail, iconBg: "#efefea", iconColor: "#26201c", count: 2, status: "READY" },
  { id: "schedule", name: "Schedule Agent", description: "Manage meetings, surface conflicts, propose times.", icon: CalendarDays, iconBg: "#efefea", iconColor: "#26201c", status: "READY" },
  { id: "knowledge", name: "Knowledge Agent", description: "Search across docs, summarize, answer questions.", icon: BookOpen, iconBg: "#efefea", iconColor: "#26201c", status: "READY" },
  { id: "message", name: "Message Agent", description: "Handle Slack/Teams messages, summarize threads.", icon: MessageSquare, iconBg: "#efefea", iconColor: "#26201c", count: 1, status: "READY" },
  { id: "project", name: "Project Agent", description: "Track tasks, surface blockers, auto-update.", icon: Briefcase, iconBg: "#efefea", iconColor: "#26201c", status: "READY" },
  { id: "sales", name: "Sales Agent", description: "Manage pipeline, update records, draft outreach.", icon: TrendingUp, iconBg: "#efefea", iconColor: "#26201c", count: 2, status: "READY" },
  { id: "data", name: "Data Agent", description: "Query warehouses, render charts, explain trends.", icon: BarChart3, iconBg: "#efefea", iconColor: "#26201c", status: "READY" },
  { id: "finance", name: "Finance Agent", description: "Track spend, generate reports, flag anomalies.", icon: Coins, iconBg: "#efefea", iconColor: "#26201c", count: 1, status: "READY" },
  { id: "hr", name: "HR Agent", description: "Recruiting funnel, employee data, policies.", icon: Users, iconBg: "#efefea", iconColor: "#26201c", count: 1, status: "READY" },
];

function AgentPage() {
  const [selectedId, setSelectedId] = useState("email");
  const [query, setQuery] = useState("");
  const selected = AGENTS.find((a) => a.id === selectedId) ?? AGENTS[0];
  const filtered = AGENTS.filter((a) =>
    a.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="h-screen w-full flex bg-warm-bg-2 overflow-hidden">
      {/* Left agents list — mirrors Flow ListColumn styling */}
      <aside className="w-[290px] shrink-0 border-r border-warm-gray-2 bg-warm-bg-2 flex flex-col">
        <div className="px-3.5">
          <div className="h-[60px] flex items-center justify-between">
            <h2 className="text-base font-medium tracking-tight">Agent</h2>
            <div className="flex items-center gap-1 text-warm-2">
              <button
                title="New agent"
                className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
              >
                <Plus className="w-[18px] h-[18px]" strokeWidth={1.6} />
              </button>
            </div>
          </div>
          <div className="h-9 mb-3 rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 transition-all focus-within:border-[#0891B2] focus-within:ring-2 focus-within:ring-teal-tint/60">
            <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
            />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto px-3 pb-3 space-y-1 scrollbar-thin">
          {filtered.map((a) => {
            const Icon = a.icon;
            const isActive = a.id === selectedId;
            return (
              <li key={a.id}>
                <button
                  onClick={() => setSelectedId(a.id)}
                  className={`w-full text-left rounded-lg px-3 py-2.5 flex gap-3 items-center transition-colors ${
                    isActive ? "bg-[#EAEFEE]" : "hover:bg-warm-base/60"
                  }`}
                >
                  <span className="w-9 h-9 rounded-full bg-warm-gray-2 flex items-center justify-center shrink-0 text-warm-black">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-[13px] truncate text-warm-black">{a.name}</p>
                      {a.count != null && (
                        <span className="shrink-0 min-w-[16px] h-4 px-1 rounded-full bg-[#0891B2] text-white text-[10px] font-medium flex items-center justify-center tabular-nums leading-none">
                          {a.count}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-warm-2 truncate">{a.description}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Right detail — empty state for now */}
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center text-center px-8">
        <span className="w-14 h-14 rounded-full bg-warm-gray-2 flex items-center justify-center mb-4 text-warm-black">
          <selected.icon className="w-6 h-6" strokeWidth={1.6} />
        </span>
        <p className="text-[18px] font-semibold text-warm-black mb-1">
          {selected.name}
        </p>
        <p className="text-[13px] text-warm-2 max-w-[360px]">
          {selected.description}
        </p>
        <p className="text-[12px] text-warm-2 mt-6">
          Detail view coming soon — pick another agent from the list to switch.
        </p>
      </div>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-warm-gray-2 bg-white px-4 py-3">
      <p className="text-[28px] font-bold tracking-tight text-warm-black leading-none">
        {value}
      </p>
      <p className="text-[10.5px] tracking-[0.08em] uppercase text-warm-2 font-semibold mt-2">
        {label}
      </p>
    </div>
  );
}

function AgentTaskRow({
  color,
  title,
  badge,
  badgeBg,
  badgeFg,
}: {
  color: string;
  title: string;
  badge: string;
  badgeBg: string;
  badgeFg: string;
}) {
  return (
    <div className="rounded-xl border border-warm-gray-2 bg-white px-4 py-3 flex items-center gap-3">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <p className="flex-1 text-[14px] text-warm-black truncate">{title}</p>
      <span
        className="shrink-0 px-2 py-[3px] rounded text-[10px] font-semibold tracking-wide"
        style={{ background: badgeBg, color: badgeFg }}
      >
        {badge}
      </span>
    </div>
  );
}

/* ===========================
 * SOPs page
 * =========================== */

type SopTab = "featured" | "organization" | "mine";

type SopCategoryKey =
  | "all"
  | "design"
  | "engineering"
  | "ops"
  | "hr"
  | "finance"
  | "admin"
  | "team"
  | "customer"
  | "ai";

type SopCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bg: string;
  iconBg: string;
  iconColor: string;
  author: string;
  scope: SopTab;
  category?: SopCategoryKey;
};

// Bug Triage Router style — white card, gray icon tile, gray stroke, hover shadow.
const SOP_CARD_BG = "#ffffff";
const SOP_ICON_BG = "#efefea";
const SOP_ICON_COLOR = "#26201c";

const SOP_CATEGORIES: { key: SopCategoryKey; label: string; count: number }[] = [
  { key: "all", label: "All", count: 515 },
  { key: "design", label: "产品设计", count: 54 },
  { key: "engineering", label: "工程开发", count: 116 },
  { key: "ops", label: "运维与稳定性", count: 91 },
  { key: "hr", label: "人事招聘", count: 50 },
  { key: "finance", label: "财务税务", count: 40 },
  { key: "admin", label: "行政与物业", count: 44 },
  { key: "team", label: "团队管理", count: 20 },
  { key: "customer", label: "客户与反馈", count: 47 },
  { key: "ai", label: "AI 与研究", count: 46 },
];

const mk = (
  id: string,
  title: string,
  description: string,
  icon: LucideIcon,
  author: string,
  scope: SopTab,
  category?: SopCategoryKey,
): SopCard => ({
  id,
  title,
  description,
  icon,
  bg: SOP_CARD_BG,
  iconBg: SOP_ICON_BG,
  iconColor: SOP_ICON_COLOR,
  author,
  scope,
  category,
});

const SOP_CARDS: SopCard[] = [
  // Featured (2) — the strongest examples
  mk("f1", "Bug Triage Router", "Auto-categorizes incoming bugs by severity and owner, drafts owner notifications, and updates the dashboard in one go.", Sparkles, "Hua", "featured"),
  mk("f2", "Customer Interview Synthesis", "Turns raw transcripts into themed insight report with quotes, frequency, and product implications mapped to current OKRs.", Users, "Amanda", "featured"),

  // Organization — HR & Recruiting (人事招聘)
  mk("o1", "面试招聘 SOP", "盛大公司面试招聘全流程 SOP，涵盖角色分工、面试评价管理、面试官管理、候选人管理及录用流程。适用于 HR 人...", Users, "Jessica LU", "organization", "hr"),
  mk("o2", "入职流程 SOP", "新员工从签 offer 到入职第一周的完整 SOP，包含 IT 设备、账号开通、buddy 安排、第一周培训计划与首次 1:1 模板。", ClipboardList, "Mei", "organization", "hr"),
  mk("o3", "员工离职交接 SOP", "员工离职全流程交接 SOP，覆盖文档归档、账号回收、知识转移、客户/合作方通知与最后一周仪式。HR + 直属上级协同。", Briefcase, "HR Team", "organization", "hr"),
  mk("o4", "季度绩效评估 SOP", "季度绩效评估完整流程：目标对齐、自评、上级评、Calibration、反馈面谈与改进计划。附带模板与时间线。", CheckCircle2, "HR Manager", "organization", "hr"),

  // Organization — Ops / Security (运维与稳定性)
  mk("o5", "员工网络钓鱼防范培训 SOP", "员工网络钓鱼防范与模拟培训全流程 SOP，面向所有员工自助使用。员工打开 SOP 后，AI 全程引导完成：打招呼 → ...", Atom, "Chris CAI", "organization", "ops"),
  mk("o6", "员工数据保留与删除合规培训 SOP", "员工数据保留与删除合规培训全流程 SOP，面向所有员工自助使用。员工打开 SOP 后，AI 全程引导完成：打招呼 → ...", BookOpenText, "Chris CAI", "organization", "ops"),
  mk("o7", "员工数据分类培训 SOP", "员工数据分类培训全流程 SOP，面向所有员工自助使用。员工打开 SOP 后，AI 全程引导完成：打招呼 → 推送培训...", Workflow, "Chris CAI", "organization", "ops"),
  mk("o8", "安全事件应急响应 SOP", "P0/P1 安全事件应急响应 SOP：发现 → 分级 → 通报链路 → 隔离 → 复盘。包含值班表、通告模板与法务联动节点。", Bell, "Sec Ops", "organization", "ops"),
  mk("o9", "数据备份与恢复演练 SOP", "季度数据备份与恢复演练 SOP，覆盖核心数据库、对象存储与配置中心的备份验证、RTO/RPO 度量与异常上报。", RefreshCw, "Ops Team", "organization", "ops"),

  // Organization — Engineering (工程开发)
  mk("o10", "代码审查 Checklist SOP", "代码审查标准化 SOP：合并前检查清单、命名/边界条件/测试覆盖、Reviewer 轮值与冲突处理。适用于全工程团队。", FileText, "Daniel", "organization", "engineering"),
  mk("o11", "部署流程规范 SOP", "生产部署 SOP：变更窗口、灰度策略、健康检查、回滚预案、值班通知模板。覆盖前端/后端/数据三个域。", Rocket, "Henry", "organization", "engineering"),
  mk("o12", "API 文档生成 SOP", "API 文档生成与同步 SOP：OpenAPI 规范、示例代码、版本归档、Breaking Change 通知与外部 changelog 自动汇总。", BookOpen, "Zach", "organization", "engineering"),
  mk("o13", "错误监控配置 SOP", "Sentry/前端错误监控配置 SOP，包含告警阈值、值班分配、误报压制策略与每周错误回顾会议模板。", Bell, "Chris", "organization", "engineering"),

  // Organization — Design (产品设计)
  mk("o14", "UI 配色分析与推荐", "根据用户已有的界面配色（主色、辅色、背景色），推荐需要补全的颜色角色（如标题色、正文色、辅助色等），并...", ImageIcon, "Yulun CAI", "organization", "design"),
  mk("o15", "设计组件审计 SOP", "季度设计系统组件审计 SOP：识别使用情况、检查偏离、归档过时组件并同步至代码侧 token。设计 + 前端协同执行。", LayoutGrid, "Mia", "organization", "design"),
  mk("o16", "用户测试结果整理 SOP", "可用性测试结果整理 SOP：会话剪辑、问题分级、与原型/PRD 关联、产出可执行迭代清单。适配 5 ± 用户的快速测试。", ListTodo, "Yifei", "organization", "design"),

  // Organization — Admin (行政与物业)
  mk("o17", "居家办公工作信息整合 SOP", "居家办公期间（如生病、隔离、疫情等）快速整合工作信息的完整流程。适用场景：用户居家办公、无法到岗、需要...", FolderPlus, "Vincent XU", "organization", "admin"),
  mk("o18", "员工差旅审批流程 SOP", "员工差旅申请、审批、报销与出差总结完整 SOP。包含预算上限、紧急联络人、出差日报模板与归档要求。", Briefcase, "Admin", "organization", "admin"),

  // Organization — Finance (财务税务)
  mk("o19", "报销审核 SOP", "员工报销审核 SOP：单据规范、税务合规检查、超支审批链路、月末结账时间窗与异常案例处理。", Coins, "Finance", "organization", "finance"),
  mk("o20", "季度财报生成 SOP", "季度财报生成 SOP：科目核对、子公司合并、董事会披露材料生成、外部审计联动节点与归档。", BarChart3, "CFO Office", "organization", "finance"),

  // Organization — Customer & Feedback (客户与反馈)
  mk("o21", "客户反馈分类 SOP", "客户反馈分类与转派 SOP：渠道汇总、情感识别、与产品/工程/客服路由对接，并产出每周 Top 5 反馈摘要。", MessageSquare, "Support", "organization", "customer"),
  mk("o22", "NPS 调研执行 SOP", "季度 NPS 调研 SOP：用户分群、问卷投放、回收率监控、定性归因访谈与执行委员会汇报材料模板。", TrendingUp, "Research", "organization", "customer"),

  // Organization — Team Management (团队管理)
  mk("o23", "周会 Agenda SOP", "团队周会 Agenda SOP：上周回顾、本周聚焦、阻塞与外部依赖、决策记录与 action items 同步至看板。", CalendarDays, "Team Lead", "organization", "team"),

  // Organization — AI & Research (AI 与研究)
  mk("o24", "Prompt 实验记录 SOP", "Prompt/模型实验记录 SOP：实验编号、Hypothesis、变量、评估集、结果与下一步。统一存档便于团队复用。", Atom, "AI Team", "organization", "ai"),
  mk("o25", "模型评测流程 SOP", "新模型上线前评测流程 SOP：基准集、自动评测、抽样人工评估、回归检查与上线决议会议模板。", BarChart3, "AI Team", "organization", "ai"),

  // Mine (3)
  mk("m1", "我的周报模板 SOP", "本周完成 / 下周计划 / 阻塞与求助 / 关键学习。直接生成给上级和团队的两个版本。", ClipboardList, "Yiran", "mine"),
  mk("m2", "设计 critique 流程 SOP", "我主持的设计 critique 流程：议题准备、参考材料、反馈结构（What works → Concerns → Open）、决议记录。", MessageSquare, "Yiran", "mine"),
  mk("m3", "用户访谈记录 SOP", "我做用户访谈时的标准 SOP：脚本结构、录音/转写流程、洞察归档至 Notion 并产出可执行清单。", FileText, "Yiran", "mine"),
];

function SopsPage() {
  const [tab, setTab] = useState<SopTab>("featured");
  const [category, setCategory] = useState<SopCategoryKey>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const tabs: Array<{ id: SopTab; label: string; count: number }> = [
    { id: "featured", label: "Featured", count: 2 },
    { id: "organization", label: "Organization", count: 515 },
    { id: "mine", label: "Mine", count: 3 },
  ];

  const cards = SOP_CARDS.filter((c) => {
    if (tab !== c.scope) return false;
    if (tab === "organization" && category !== "all" && c.category !== category) return false;
    if (!query.trim()) return true;
    return c.title.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      <div className="h-[60px] shrink-0" />

      <div className="shrink-0">
        <div className="max-w-[1080px] mx-auto px-10">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[28px] font-bold tracking-tight">SOPs</h1>
              <span className="text-[16px] text-warm-2 font-medium">(520)</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {searchOpen ? (
                <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white transition-all focus-within:border-[#0891B2] focus-within:ring-2 focus-within:ring-teal-tint/60">
                  <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search SOPs..."
                    className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
              )}
              <button className="h-9 px-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0891B2] text-white text-[13px] font-medium hover:bg-[#0891B2]/90">
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                New SOP
              </button>
            </div>
          </div>
          <p className="text-[13px] text-warm-2 mb-5">
            Pre-built workflows to automate recurring processes.
          </p>

          <div className="border-b border-warm-gray-2 flex gap-6 mb-5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative py-2.5 text-[14px] transition-colors ${
                  tab === t.id ? "text-warm-black font-semibold" : "text-warm-2 hover:text-warm-black"
                }`}
              >
                {t.label}{" "}
                <span className={tab === t.id ? "text-warm-2 font-normal" : ""}>({t.count})</span>
                {tab === t.id && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0891B2]" />
                )}
              </button>
            ))}
          </div>

          {tab === "organization" && (
            <div className="flex gap-3 overflow-x-auto pb-3 mb-3 scrollbar-thin">
              {SOP_CATEGORIES.map((c) => {
                const isActive = category === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c.key)}
                    className={`shrink-0 px-2.5 py-[5px] rounded-full text-[12px] font-medium transition-colors ${
                      isActive
                        ? "bg-warm-base text-warm-black"
                        : "text-warm-2 hover:bg-warm-base/60"
                    }`}
                  >
                    {c.label} ({c.count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1080px] mx-auto px-10 pb-10">
          {cards.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {cards.map((c) => (
                <SopCardView key={c.id} card={c} />
              ))}
            </div>
          ) : (
            <div className="text-center text-warm-2 text-[13px] py-20">
              No SOPs here yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SopCardView({ card }: { card: SopCard }) {
  const Icon = card.icon;
  return (
    <button
      className="text-left rounded-2xl p-4 flex flex-col gap-3 transition-all border border-warm-gray-2 bg-white hover:border-[#0891B2] hover:bg-[#EBEEEE] hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)]"
    >
      <span
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: card.iconBg, color: card.iconColor }}
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-warm-black">{card.title}</p>
        <p className="text-[13px] text-warm-black/70 mt-1 line-clamp-2">{card.description}</p>
      </div>
      <div className="border-t border-warm-black/10 pt-2.5 mt-1.5">
        <p className="text-[11.5px] text-warm-black/55">Created by {card.author}</p>
      </div>
    </button>
  );
}

/* ===========================
 * Calendar page
 * =========================== */

type CalendarView = "day" | "week" | "month";

type CalEvent = {
  id: string;
  title: string;
  dayIndex: number; // 0=Sun, 6=Sat
  startHour: number; // 0-23 (decimal allowed, e.g. 14.5 = 14:30)
  endHour: number;
  color: "orange" | "olive" | "blue" | "purple";
};

const CAL_EVENT_STYLES: Record<
  CalEvent["color"],
  { bg: string; fg: string }
> = {
  orange: { bg: "#e3b08b", fg: "#3d2614" },
  olive: { bg: "#c3cf99", fg: "#3a3f1f" },
  blue: { bg: "#d4cfc4", fg: "#26201c" },
  purple: { bg: "#bdbbaf", fg: "#26201c" },
};

const CAL_EVENTS: CalEvent[] = [
  {
    id: "e1",
    title: "review",
    dayIndex: 2,
    startHour: 15.5,
    endHour: 16.5,
    color: "olive",
  },
  {
    id: "e2",
    title: "product review",
    dayIndex: 3,
    startHour: 14.5,
    endHour: 15.5,
    color: "orange",
  },
];

const CAL_HOUR_HEIGHT = 60; // px per hour
const CAL_START_HOUR = 0;
const CAL_END_HOUR = 24;
const CAL_TIME_COL_WIDTH = 56;

function CalendarPage() {
  const [view, setView] = useState<CalendarView>("week");
  // Use a fixed reference date so the demo always matches "May 10-16, 2026"
  // Today is Fri May 15, 2026 in this snapshot.
  const todayDayIndex = 5; // Fri = 5
  const days = [
    { label: "Sun", date: 10 },
    { label: "Mon", date: 11 },
    { label: "Tue", date: 12 },
    { label: "Wed", date: 13 },
    { label: "Thu", date: 14 },
    { label: "Fri", date: 15 },
    { label: "Sat", date: 16 },
  ];
  const nowHour = 15.5; // 15:30 timeline indicator for "now"

  // Scroll to ~13:00 by default to match the reference framing
  const gridScrollRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (gridScrollRef.current) {
      gridScrollRef.current.scrollTop = 13 * CAL_HOUR_HEIGHT - 10;
    }
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      {/* Empty top — 60px non-scrollable */}
      <div className="h-[60px] shrink-0" />

      {/* Fixed page header (title row + toolbar row) */}
      <div className="shrink-0 max-w-[1080px] mx-auto w-full px-10">
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-[28px] font-bold tracking-tight">Calendar</h1>
          <button className="h-8 px-3 mt-1 inline-flex items-center gap-1.5 rounded-lg border border-warm-gray-2 bg-white text-[13px] font-medium text-warm-black hover:bg-warm-base shrink-0">
            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
            New event
          </button>
        </div>
        <p className="text-[13px] text-warm-2 mb-5">
          Schedule recurring and one-time tasks for your agents.
        </p>

        {/* Toolbar — Today / prev / next / date range + view toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 rounded-lg border border-warm-gray-2 bg-white text-[13px] font-medium text-warm-black hover:bg-warm-base">
              Today
            </button>
            <div className="flex items-center">
              <button
                className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.8} />
              </button>
              <button
                className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </div>
            <button className="inline-flex items-center gap-1 text-[15px] font-medium text-warm-black hover:bg-warm-base rounded-md px-2 h-8">
              May 10 – 16, 2026
              <ChevronDown className="w-3.5 h-3.5 text-warm-2" strokeWidth={1.8} />
            </button>
          </div>
          <div className="inline-flex items-center p-[3px] rounded-lg bg-warm-base shrink-0">
            {(["day", "week", "month"] as CalendarView[]).map((v) => {
              const label = v === "day" ? "Day" : v === "week" ? "Week" : "Month";
              return (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`h-7 px-3 rounded-md text-[12px] font-medium transition-colors ${
                    view === v
                      ? "bg-[#0891B2] text-white"
                      : "text-warm-2 hover:text-warm-black"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 min-h-0 mt-3 max-w-[1080px] mx-auto w-full px-10 pb-6">
        <div className="h-full rounded-lg border border-warm-gray-2 bg-white overflow-hidden flex flex-col">
          {/* Day header row */}
          <div className="grid border-b border-warm-gray-2 shrink-0"
            style={{
              gridTemplateColumns: `${CAL_TIME_COL_WIDTH}px repeat(7, minmax(0, 1fr))`,
            }}
          >
            <div className="border-r border-warm-gray-2" />
            {days.map((d, i) => {
              const isToday = i === todayDayIndex;
              return (
                <div
                  key={d.label}
                  className={`relative h-16 flex flex-col items-center justify-center gap-1.5 ${
                    i < 6 ? "border-r border-warm-gray-2" : ""
                  }`}
                >
                  {isToday && (
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-[3px] bg-[#0891B2]"
                    />
                  )}
                  <span
                    className={`text-[13px] font-medium leading-none tabular-nums ${
                      isToday ? "text-[#26201c]" : "text-warm-black"
                    }`}
                  >
                    {d.date}
                  </span>
                  <span
                    className={`text-[10px] font-normal leading-none ${
                      isToday ? "text-[#26201c]" : "text-warm-2"
                    }`}
                  >
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Scrollable time grid */}
          <div ref={gridScrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
            <div
              className="grid relative"
              style={{
                gridTemplateColumns: `${CAL_TIME_COL_WIDTH}px repeat(7, minmax(0, 1fr))`,
                height: `${(CAL_END_HOUR - CAL_START_HOUR) * CAL_HOUR_HEIGHT}px`,
              }}
            >
              {/* Time labels column */}
              <div className="relative border-r border-warm-gray-2">
                {Array.from({ length: CAL_END_HOUR - CAL_START_HOUR }).map(
                  (_, idx) => {
                    const hour = CAL_START_HOUR + idx;
                    if (hour === CAL_START_HOUR) return null; // skip 0:00 label at top edge
                    return (
                      <div
                        key={hour}
                        className="absolute right-3 text-[11px] text-warm-2 -translate-y-1/2"
                        style={{ top: idx * CAL_HOUR_HEIGHT }}
                      >
                        {hour.toString().padStart(2, "0")}:00
                      </div>
                    );
                  },
                )}
              </div>

              {/* Day columns */}
              {days.map((d, dayIdx) => (
                <div
                  key={d.label}
                  className={`relative ${
                    dayIdx < 6 ? "border-r border-warm-gray-2" : ""
                  }`}
                >
                  {/* Hour gridlines */}
                  {Array.from({ length: CAL_END_HOUR - CAL_START_HOUR }).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className="absolute left-0 right-0 border-t border-warm-gray-2/60"
                        style={{ top: idx * CAL_HOUR_HEIGHT }}
                      />
                    ),
                  )}

                  {/* Events for this day */}
                  {CAL_EVENTS.filter((e) => e.dayIndex === dayIdx).map((e) => {
                    const top = (e.startHour - CAL_START_HOUR) * CAL_HOUR_HEIGHT;
                    const height =
                      (e.endHour - e.startHour) * CAL_HOUR_HEIGHT - 2;
                    const style = CAL_EVENT_STYLES[e.color];
                    return (
                      <button
                        key={e.id}
                        className="absolute left-1.5 right-1.5 rounded-md px-2 py-1 text-[11.5px] font-medium text-left truncate hover:brightness-95 transition"
                        style={{
                          top,
                          height,
                          background: style.bg,
                          color: style.fg,
                        }}
                        title={e.title}
                      >
                        {e.title}
                      </button>
                    );
                  })}

                  {/* "Now" line on today's column */}
                  {dayIdx === todayDayIndex && (
                    <div
                      className="absolute left-0 right-0 flex items-center pointer-events-none"
                      style={{
                        top: (nowHour - CAL_START_HOUR) * CAL_HOUR_HEIGHT,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-warm-2 -ml-1 shrink-0" />
                      <span className="flex-1 h-px bg-warm-2/70" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkPage() {
  const [tab, setTab] = useState<"linked" | "unlinked">("linked");
  const [category, setCategory] = useState<LinkCategoryKey>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const linkedCount = linkTools.filter((t) => t.linked).length;
  const unlinkedCount = linkTools.length - linkedCount;

  const filtered = linkTools.filter((t) => {
    if (tab === "linked" && !t.linked) return false;
    if (tab === "unlinked" && t.linked) return false;
    if (category !== "all" && t.category !== category) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      if (!t.name.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  // Counts per category (for the active tab only)
  const tabPool = linkTools.filter((t) =>
    tab === "linked" ? t.linked : !t.linked,
  );
  const countFor = (key: LinkCategoryKey): number =>
    key === "all"
      ? tabPool.length
      : tabPool.filter((t) => t.category === key).length;

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      {/* Empty top — 60px non-scrollable (matches header height pattern) */}
      <div className="h-[60px] shrink-0" />

      {/* Fixed header: title + subtitle + tabs + chips (does NOT scroll) */}
      <div className="shrink-0">
        <div className="max-w-[1080px] mx-auto px-10">
          {/* Page title + search */}
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-[28px] font-bold tracking-tight">Link</h1>
            <div className="h-9 mt-2 flex items-center">
              {searchOpen ? (
                <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white transition-all focus-within:border-[#0891B2] focus-within:ring-2 focus-within:ring-teal-tint/60">
                  <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search tools..."
                    className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
              )}
            </div>
          </div>
          <p className="text-[13px] text-warm-2 mb-5">
            Connect tools and accounts to surface the right data when you need it.
          </p>

          {/* Tabs */}
          <div className="border-b border-warm-gray-2 flex gap-6 mb-5">
            <TabButton
              active={tab === "linked"}
              onClick={() => setTab("linked")}
              label="Linked"
              count={linkedCount}
            />
            <TabButton
              active={tab === "unlinked"}
              onClick={() => setTab("unlinked")}
              label="Unlinked"
              count={unlinkedCount}
            />
          </div>

          {/* Category chips */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-3 scrollbar-thin">
            {linkCategories.map((c) => {
              const isActive = category === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`shrink-0 px-2.5 py-[5px] rounded-full text-[12px] font-medium transition-colors ${
                    isActive
                      ? "bg-warm-base text-warm-black"
                      : "text-warm-2 hover:bg-warm-base/60"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrollable card grid */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1080px] mx-auto px-10">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((t) => (
                <LinkCard key={t.id} tool={t} />
              ))}
            </div>
          ) : (
            <div className="text-center text-warm-2 text-[13px] py-20">
              Nothing here yet.
            </div>
          )}
        </div>
      </div>

      {/* Empty bottom — 60px non-scrollable (matches header height) */}
      <div className="h-[60px] shrink-0" />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button onClick={onClick} className="relative pb-3 -mb-px">
      <span
        className={`text-[14px] font-medium ${
          active ? "text-warm-black" : "text-warm-2 hover:text-warm-black"
        }`}
      >
        {label} <span className={active ? "text-warm-black" : "text-warm-2"}>({count})</span>
      </span>
      {active && (
        <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#0891B2] rounded-full" />
      )}
    </button>
  );
}

function LinkCard({ tool }: { tool: LinkTool }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="group/link text-left rounded-xl border border-warm-gray-2 bg-white px-4 py-3 flex items-center gap-3 transition-all hover:border-[#0891B2] hover:bg-[#EBEEEE] hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)]">
      <span
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[15px] font-bold"
        style={{ background: tool.letterBg, color: tool.letterColor }}
      >
        {imgFailed ? (
          tool.letter
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tool.iconUrl}
            alt={tool.name}
            width={22}
            height={22}
            className="w-[22px] h-[22px] object-contain"
            onError={() => setImgFailed(true)}
          />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-warm-black truncate">{tool.name}</p>
        <p className="text-[12px] text-warm-2 mt-0.5 flex items-center gap-1">
          {tool.linked ? (
            <>
              <Link2 className="w-3 h-3" strokeWidth={2} />
              Linked
            </>
          ) : (
            "Unlinked"
          )}
        </p>
      </div>
      {!tool.linked && (
        <button className="shrink-0 h-7 px-3 rounded-lg border border-warm-gray-2 bg-white text-[12px] font-medium text-warm-black hover:bg-warm-base hover:border-warm-border transition-colors">
          Link
        </button>
      )}
    </div>
  );
}

/* ===========================
 * Action card (Send Email / Permission / etc.)
 * Matches the user's design language: thin tinted border, uppercase state tag,
 * icon circle, structured fields, primary CTA + optional Dismiss link.
 * =========================== */

type ActionState = "proposed" | "completed" | "expired";

const ACTION_STATE_THEME: Record<
  ActionState,
  { border: string; iconBg: string; iconColor: string; tagText: string; tagLabel: string }
> = {
  proposed: {
    border: "#e5e3db",
    iconBg: "#26201c",
    iconColor: "#ffffff",
    tagText: "#bdbbaf",
    tagLabel: "PROPOSED ACTION",
  },
  completed: {
    border: "#e5e3db",
    iconBg: "#efefea",
    iconColor: "#26201c",
    tagText: "#bdbbaf",
    tagLabel: "COMPLETED",
  },
  expired: {
    border: "#e5e3db",
    iconBg: "#efefea",
    iconColor: "#bdbbaf",
    tagText: "#bdbbaf",
    tagLabel: "EXPIRED",
  },
};

type ActionRecipient = {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
};

function SendEmailActionCard({
  state,
  recipients,
  overflowCount,
  subject,
  body,
  attachmentNote,
  onConfirm,
  onDismiss,
}: {
  state: ActionState;
  recipients: ActionRecipient[];
  overflowCount?: number;
  subject: string;
  body: string;
  attachmentNote?: string;
  onConfirm?: () => void;
  onDismiss?: () => void;
}) {
  const theme = ACTION_STATE_THEME[state];
  const Icon = state === "proposed" ? Zap : state === "completed" ? CheckCircle2 : Clock;
  return (
    <div className="mb-4">
      <div className="rounded-2xl border border-warm-gray-2 bg-white overflow-hidden">
        {/* Header — mirrors Table card header pattern */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-warm-gray-2/70">
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded flex items-center justify-center shrink-0"
              style={{ background: theme.iconBg, color: theme.iconColor }}
            >
              <Icon className="w-3 h-3" strokeWidth={2.2} />
            </span>
            <span className="text-[13px] font-medium text-warm-black">Send Email</span>
            <span
              className="text-[11px] font-medium tracking-[0.04em]"
              style={{ color: theme.tagText }}
            >
              · {theme.tagLabel}
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-warm-2">
            {state === "proposed" && (
              <IconBtn title="Edit">
                <Pencil className="w-3.5 h-3.5" strokeWidth={1.8} />
              </IconBtn>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          {/* Recipients */}
          <p className="text-[11px] text-warm-2 mb-1.5">Send to</p>
          <div className="flex items-center flex-wrap gap-1.5 mb-3">
            {recipients.map((r) => (
              <span
                key={r.id}
                className="inline-flex items-center gap-1 h-6 pl-[2px] pr-2 rounded-full border border-warm-gray-2 bg-white text-[12px] text-warm-black"
              >
                {r.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.avatarUrl}
                    alt={r.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="w-5 h-5 rounded-full text-white text-[9px] font-semibold flex items-center justify-center"
                    style={{ background: r.color ?? "#827d73" }}
                  >
                    {r.name.slice(0, 1)}
                  </span>
                )}
                <span className="truncate max-w-[72px]">{r.name}</span>
              </span>
            ))}
            {overflowCount && overflowCount > 0 && (
              <span className="inline-flex items-center h-6 px-2 rounded-full bg-warm-base text-[12px] text-warm-2">
                +{overflowCount}
              </span>
            )}
          </div>

          {/* Subject */}
          <p className="text-[11px] text-warm-2 mb-1">Subject</p>
          <p className="text-[13px] font-medium text-warm-black mb-3 leading-snug">
            {subject}
          </p>

          {/* Body */}
          <p className="text-[11px] text-warm-2 mb-1">Body</p>
          <p className="text-[13px] text-warm-black/85 leading-snug whitespace-pre-line mb-3">
            {body}
          </p>

          {/* Attachment */}
          {attachmentNote && (
            <div className="flex items-center gap-1 text-[12px] text-warm-2">
              <Paperclip className="w-3 h-3" strokeWidth={1.8} />
              {attachmentNote}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-2.5 border-t border-warm-gray-2/70 bg-warm-bg-2/40">
          {state === "proposed" && (
            <button
              onClick={onConfirm}
              className="w-full text-[13px] font-medium text-warm-black hover:text-warm-black/80 transition"
            >
              Confirm
            </button>
          )}
          {state === "completed" && (
            <button
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-1 text-[13px] font-medium text-warm-black hover:text-warm-black/70 transition-colors"
            >
              View Detail <ArrowRight className="w-3 h-3" strokeWidth={2} />
            </button>
          )}
          {state === "expired" && (
            <button
              disabled
              className="w-full text-[13px] font-medium text-warm-2 cursor-not-allowed"
            >
              Expired
            </button>
          )}
        </div>
      </div>

      {state === "proposed" && (
        <button
          onClick={onDismiss}
          className="w-full text-center text-[12px] text-warm-2 hover:text-warm-black mt-2 py-1"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

function WideTableActionCard({
  title,
  state,
  columns,
  rows,
  footnote,
}: {
  title: string;
  state: ActionState;
  columns: string[];
  rows: string[][];
  footnote?: string;
}) {
  const theme = ACTION_STATE_THEME[state];
  const Icon =
    state === "proposed" ? LayoutGrid : state === "completed" ? CheckCircle2 : Clock;
  return (
    <div className="mb-4">
      <div className="rounded-2xl border border-warm-gray-2 bg-white overflow-hidden">
        {/* Header — same pattern as SendEmail card */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-warm-gray-2/70">
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded flex items-center justify-center shrink-0"
              style={{ background: theme.iconBg, color: theme.iconColor }}
            >
              <Icon className="w-3 h-3" strokeWidth={2.2} />
            </span>
            <span className="text-[13px] font-medium text-warm-black">{title}</span>
            <span
              className="text-[11px] font-medium tracking-[0.04em]"
              style={{ color: theme.tagText }}
            >
              · {theme.tagLabel}
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-warm-2">
            <IconBtn title="Copy">
              <Copy className="w-3.5 h-3.5" strokeWidth={1.8} />
            </IconBtn>
            <IconBtn title="Download">
              <Download className="w-3.5 h-3.5" strokeWidth={1.8} />
            </IconBtn>
            <IconBtn title="Expand">
              <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.8} />
            </IconBtn>
          </div>
        </div>

        {/* Scrollable horizontal table */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-[12px] text-warm-black border-collapse">
            <thead>
              <tr className="bg-warm-bg-2/60">
                {columns.map((c) => (
                  <th
                    key={c}
                    className="text-left font-medium text-warm-2 tracking-[0.02em] uppercase text-[10.5px] px-3 py-2 border-b border-warm-gray-2/70 whitespace-nowrap"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 0 ? "" : "bg-warm-bg-2/40"}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2 border-b border-warm-gray-2/40 whitespace-nowrap"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer — Table-style */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-warm-gray-2/70 bg-warm-bg-2/40">
          <span className="text-[12px] text-warm-2 truncate">
            {footnote ?? `Showing ${rows.length} rows × ${columns.length} columns`}
          </span>
          <button className="flex items-center gap-1 text-[12px] text-warm-black hover:text-warm-black/70 transition-colors shrink-0 ml-3">
            View in new window <ArrowRight className="w-3 h-3" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

function useScrollFades<T extends HTMLElement>(deps: React.DependencyList) {
  const ref = useRef<T>(null);
  const [fades, setFades] = useState({ top: false, bottom: false });

  function recompute() {
    const el = ref.current;
    if (!el) return;
    const canScrollUp = el.scrollTop > 1;
    const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setFades((prev) =>
      prev.top === canScrollUp && prev.bottom === canScrollDown
        ? prev
        : { top: canScrollUp, bottom: canScrollDown },
    );
  }

  useLayoutEffect(() => {
    recompute();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => recompute());
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref, fades, onScroll: recompute };
}

function MessageFeedback() {
  return (
    <div className="flex items-center gap-1 text-warm-2 -ml-1.5">
      <IconBtn title="Helpful">
        <ThumbsUp className="w-4 h-4" strokeWidth={1.8} />
      </IconBtn>
      <IconBtn title="Not helpful">
        <ThumbsDown className="w-4 h-4" strokeWidth={1.8} />
      </IconBtn>
      <IconBtn title="Copy">
        <Copy className="w-4 h-4" strokeWidth={1.8} />
      </IconBtn>
      <IconBtn title="Regenerate">
        <RefreshCw className="w-4 h-4" strokeWidth={1.8} />
      </IconBtn>
    </div>
  );
}

function FlowDetailView({
  detail,
  chatInput,
  setChatInput,
  onSend,
  onClose,
}: {
  detail: FlowDetail;
  chatInput: string;
  setChatInput: (s: string) => void;
  onSend: () => void;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"none" | "complete" | "progress">("none");
  const flowFades = useScrollFades<HTMLDivElement>([detail.id]);

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2">
      {/* Header */}
      <div className="h-[60px] px-6 flex items-center justify-between">
        <h1 className="text-base tracking-tight">{detail.title}</h1>
        <div className="flex items-center gap-2 text-warm-2">
          <button
            onClick={() => setStatus(status === "complete" ? "none" : "complete")}
            className={`flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-medium hover:bg-warm-base ${
              status === "complete" ? "text-[#047857]" : ""
            }`}
          >
            <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
            Complete
          </button>
          <button
            onClick={() => setStatus(status === "progress" ? "none" : "progress")}
            className={`flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-medium hover:bg-warm-base ${
              status === "progress" ? "text-[#d97706]" : ""
            }`}
          >
            <Circle className="w-4 h-4" strokeWidth={1.8} strokeDasharray="3 2" />
            Progress
          </button>
          <button className="flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-medium hover:bg-warm-base">
            <Bookmark className="w-4 h-4" strokeWidth={1.8} />
            Save as SOP
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-warm-base"
            title="More"
          >
            <MoreVertical className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex-1 min-h-0">
        {/* Top gradient fade — only when scrolled */}
        {flowFades.fades.top && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-warm-bg-2 to-transparent z-10" />
        )}
        {/* Bottom gradient fade — only when there's more below */}
        {flowFades.fades.bottom && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-warm-bg-2 to-transparent z-10" />
        )}
        <div
          ref={flowFades.ref}
          onScroll={flowFades.onScroll}
          className="h-full overflow-y-auto px-6 py-4 scrollbar-thin"
        >
        <div className="max-w-[820px] mx-auto px-3">
          {/* User query bubble */}
          <div className="flex justify-end mb-5">
            <div className="bg-warm-base rounded-2xl px-4 py-3 text-[15px] leading-snug max-w-[85%]">
              {detail.query}
            </div>
          </div>

          {/* Action cards — per-flow scenario */}
          {(() => {
            const scenario = getFlowActionScenario(detail.id);
            if (!scenario) return null;
            return (
              <div className="mb-6 space-y-3">
                {scenario.map((step, i) => {
                  if (step.kind === "narration") {
                    return (
                      <div key={i}>
                        <p className="text-[14px] text-warm-black/85 mb-2">
                          {step.text}
                        </p>
                        <MessageFeedback />
                      </div>
                    );
                  }
                  if (step.kind === "user") {
                    return (
                      <div key={i} className="flex justify-end">
                        <div className="bg-warm-base rounded-2xl px-4 py-3 text-[15px] leading-snug max-w-[85%] text-warm-black">
                          {step.text}
                        </div>
                      </div>
                    );
                  }
                  if (step.kind === "analysis") {
                    return (
                      <p
                        key={i}
                        className="text-[12px] text-warm-2 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                        {step.label ?? "Analysis completed"}
                        <ChevronRight className="w-3 h-3" strokeWidth={2} />
                      </p>
                    );
                  }
                  if (step.kind === "email-card") {
                    return (
                      <SendEmailActionCard
                        key={i}
                        state={step.state}
                        recipients={step.recipients}
                        overflowCount={step.overflowCount}
                        subject={step.subject}
                        body={step.body}
                        attachmentNote={step.attachmentNote}
                      />
                    );
                  }
                  if (step.kind === "wide-table-card") {
                    return (
                      <WideTableActionCard
                        key={i}
                        title={step.title}
                        state={step.state}
                        columns={step.columns}
                        rows={step.rows}
                        footnote={step.footnote}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            );
          })()}

          {/* Long-form response */}
          <div className="space-y-4 text-[15px] leading-relaxed text-warm-black/90 mb-3">
            {detail.response.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Feedback actions for the long-form response */}
          <div className="mb-6">
            <MessageFeedback />
          </div>
        </div>
        </div>
      </div>

      {/* Compose */}
      <div className="px-6 pb-6 pt-2">
        <div className="max-w-[820px] mx-auto">
          <div
            className="rounded-2xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-3 transition-all focus-within:border-[#0891B2] focus-within:ring-4 focus-within:ring-teal-tint/60"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
            }}
          >
            <div className="relative min-h-[24px]">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                rows={1}
                placeholder="Start your task..."
                className="w-full bg-transparent text-[15px] leading-6 outline-none resize-none placeholder:text-transparent"
              />
              {!chatInput && (
                <div className="absolute left-0 top-0 flex items-center gap-2 pointer-events-none">
                  <span className="text-warm-2 text-[15px]">Start your task...</span>
                  <span className="bg-warm-base px-1.5 py-0.5 rounded text-[10px] font-semibold text-warm-2">
                    TAB
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5">
                <ComposerOutlineBtn title="Add">
                  <Plus className="w-4 h-4" strokeWidth={1.8} />
                </ComposerOutlineBtn>
                <ComposerOutlineBtn title="AI">
                  <Sparkles className="w-4 h-4" strokeWidth={1.8} />
                </ComposerOutlineBtn>
              </div>
              <SendBtn onClick={onSend} disabled={!chatInput.trim()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
