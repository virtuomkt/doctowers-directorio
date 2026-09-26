/* @ds-bundle: {"format":4,"namespace":"DocTowersDesignSystem_80a2e3","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"DoctorCard","sourcePath":"components/data/DoctorCard.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"ef3c2ce558af","components/core/Badge.jsx":"03257613874e","components/core/Button.jsx":"ddc9fa9ba06e","components/data/DoctorCard.jsx":"6b35079384cc","components/forms/SearchInput.jsx":"6ceaa2090286"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DocTowersDesignSystem_80a2e3 = window.DocTowersDesignSystem_80a2e3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  src,
  name,
  size = 40
}) {
  const initials = (name || "").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const style = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: "2px solid var(--white)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "var(--teal-100)",
    color: "var(--teal-700)",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-semibold)",
    fontSize: size * 0.36
  };
  return src ? React.createElement("img", {
    src,
    alt: name || "",
    style: {
      ...style,
      objectFit: "cover"
    }
  }) : React.createElement("div", {
    style
  }, initials || "?");
}
function AvatarGroup({
  avatars = [],
  max = 4
}) {
  const shown = avatars.slice(0, max);
  return React.createElement("div", {
    style: {
      display: "flex"
    }
  }, shown.map((a, i) => React.createElement("div", {
    key: i,
    style: {
      marginLeft: i === 0 ? 0 : -10,
      zIndex: shown.length - i
    }
  }, React.createElement(Avatar, {
    ...a,
    size: 36
  }))));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  tone = "accent",
  children
}) {
  const tones = {
    accent: {
      background: "var(--teal-100)",
      color: "var(--teal-700)"
    },
    dark: {
      background: "var(--color-dark)",
      color: "var(--white)"
    },
    neutral: {
      background: "var(--gray-100)",
      color: "var(--ink-700)"
    }
  };
  return React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-caption)",
      fontWeight: "var(--weight-semibold)",
      padding: "4px 12px",
      borderRadius: "var(--radius-pill)",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      ...tones[tone]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  icon = null,
  children,
  onClick
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: "var(--text-body-sm)"
    },
    md: {
      padding: "12px 22px",
      fontSize: "var(--text-body-md)"
    },
    lg: {
      padding: "16px 28px",
      fontSize: "var(--text-body-lg)"
    }
  };
  const variants = {
    primary: {
      background: "var(--color-accent)",
      color: "var(--color-accent-contrast)",
      border: "none"
    },
    dark: {
      background: "var(--color-dark)",
      color: "var(--color-text-inverse)",
      border: "none"
    },
    secondary: {
      background: "var(--white)",
      color: "var(--color-dark)",
      border: "1px solid var(--color-border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--color-dark)",
      border: "none"
    }
  };
  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-semibold)",
    borderRadius: "var(--radius-pill)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "filter var(--duration-fast) var(--ease-standard)",
    ...sizes[size],
    ...variants[variant]
  };
  return React.createElement("button", {
    style: base,
    disabled,
    onClick,
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = "brightness(0.92)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = "none";
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/data/DoctorCard.jsx
try { (() => {
function DoctorCard({
  photo,
  name,
  specialty,
  office,
  available = true,
  avatarAlign = "top"
}) {
  return React.createElement("div", {
    style: {
      background: "var(--white)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-sm)",
      border: "1px solid var(--color-border)",
      padding: "var(--space-5)",
      display: "flex",
      gap: "var(--space-4)",
      alignItems: avatarAlign === "top" ? "flex-start" : "center",
      fontFamily: "var(--font-body)",
      maxWidth: 360
    }
  }, React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      overflow: "hidden",
      flexShrink: 0,
      background: "var(--teal-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--teal-700)",
      fontWeight: "var(--weight-semibold)",
      fontSize: 18
    }
  }, photo ? React.createElement("img", {
    src: photo,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : (name || "").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()), React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-body-md)",
      color: "var(--color-text-primary)"
    }
  }, name), React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--color-text-secondary)"
    }
  }, specialty), React.createElement("div", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--color-text-secondary)"
    }
  }, office), React.createElement(__ds_scope.Badge, {
    tone: available ? "accent" : "neutral"
  }, available ? "Disponible hoy" : "Sin disponibilidad")));
}
Object.assign(__ds_scope, { DoctorCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DoctorCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function SearchInput({
  placeholder = "Busca por nombre o especialidad",
  value,
  onChange,
  onSubmit,
  buttonLabel = "Buscar"
}) {
  return React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(value);
    },
    style: {
      display: "flex",
      alignItems: "center",
      background: "var(--white)",
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-lg)",
      padding: "6px 6px 6px 24px",
      gap: "12px",
      maxWidth: 560
    }
  }, React.createElement("input", {
    value,
    placeholder,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-md)",
      color: "var(--color-text-primary)",
      background: "transparent"
    }
  }), React.createElement("button", {
    type: "submit",
    style: {
      background: "var(--color-accent)",
      color: "var(--color-accent-contrast)",
      border: "none",
      borderRadius: "var(--radius-pill)",
      padding: "14px 26px",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-body-md)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, React.createElement("svg", {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("circle", {
    cx: 11,
    cy: 11,
    r: 7
  }), React.createElement("line", {
    x1: 21,
    y1: 21,
    x2: 16.65,
    y2: 16.65
  })), buttonLabel));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.DoctorCard = __ds_scope.DoctorCard;

__ds_ns.SearchInput = __ds_scope.SearchInput;

})();
