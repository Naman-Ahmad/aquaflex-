// ===== MOBILE NAVIGATION TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger menu
      const hamburgers = navToggle.querySelectorAll(".hamburger")
      hamburgers.forEach((hamburger, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) hamburger.style.transform = "rotate(-45deg) translate(-5px, 6px)"
          if (index === 1) hamburger.style.opacity = "0"
          if (index === 2) hamburger.style.transform = "rotate(45deg) translate(-5px, -6px)"
        } else {
          hamburger.style.transform = "none"
          hamburger.style.opacity = "1"
        }
      })
    })
  }

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")

        // Reset hamburger animation
        const hamburgers = navToggle.querySelectorAll(".hamburger")
        hamburgers.forEach((hamburger) => {
          hamburger.style.transform = "none"
          hamburger.style.opacity = "1"
        })
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target)

    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")

      // Reset hamburger animation
      const hamburgers = navToggle.querySelectorAll(".hamburger")
      hamburgers.forEach((hamburger) => {
        hamburger.style.transform = "none"
        hamburger.style.opacity = "1"
      })
    }
  })
})

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's just "#"
      if (href === "#") return

      const targetElement = document.querySelector(href)

      if (targetElement) {
        e.preventDefault()

        // Calculate offset for fixed header
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// ===== CASE FILTER FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("industry-filter")
  const caseCards = document.querySelectorAll(".case-card")

  if (filterSelect && caseCards.length > 0) {
    filterSelect.addEventListener("change", function () {
      const selectedIndustry = this.value

      caseCards.forEach((card) => {
        const cardIndustry = card.getAttribute("data-industry")

        if (selectedIndustry === "all" || cardIndustry === selectedIndustry) {
          card.style.display = "block"
          card.classList.add("fade-in")
        } else {
          card.style.display = "none"
          card.classList.remove("fade-in")
        }
      })

      // Update URL parameter for bookmarking
      const url = new URL(window.location)
      if (selectedIndustry === "all") {
        url.searchParams.delete("industry")
      } else {
        url.searchParams.set("industry", selectedIndustry)
      }
      window.history.replaceState({}, "", url)
    })

    // Set initial filter from URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const industryParam = urlParams.get("industry")
    if (industryParam && filterSelect.querySelector(`option[value="${industryParam}"]`)) {
      filterSelect.value = industryParam
      filterSelect.dispatchEvent(new Event("change"))
    }
  }
})

// ===== FORM HANDLING =====
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formObject = {}
      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Simple form validation
      const requiredFields = ["name", "email", "subject", "message"]
      let isValid = true

      requiredFields.forEach((field) => {
        const input = this.querySelector(`[name="${field}"]`)
        if (!formObject[field] || formObject[field].trim() === "") {
          input.style.borderColor = "#ef4444"
          isValid = false
        } else {
          input.style.borderColor = "#d1d5db"
        }
      })

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const emailInput = this.querySelector('[name="email"]')
      if (!emailRegex.test(formObject.email)) {
        emailInput.style.borderColor = "#ef4444"
        isValid = false
      }

      if (isValid) {
        // Show success message (in a real app, you'd send this to a server)
        const submitButton = this.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent

        submitButton.textContent = "Message Sent!"
        submitButton.style.backgroundColor = "#10b981"
        submitButton.disabled = true

        // Reset form after 3 seconds
        setTimeout(() => {
          this.reset()
          submitButton.textContent = originalText
          submitButton.style.backgroundColor = "#1D4ED8"
          submitButton.disabled = false
        }, 3000)

        console.log("Form submitted:", formObject)
      } else {
        // Show error message
        alert("Please fill in all required fields correctly.")
      }
    })
  }
})

// ===== SCROLL ANIMATIONS =====
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .step, .case-card, .session-card, .value-card, .faq-item",
  )
  animatedElements.forEach((el) => observer.observe(el))
})

// ===== CALENDLY WIDGET INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  const calendlyWidget = document.querySelector(".calendly-inline-widget")

  if (calendlyWidget && window.Calendly) {
    const calendlyUrl = calendlyWidget.getAttribute("data-url")

    if (calendlyUrl && calendlyUrl !== "YOUR_CALENDLY_URL") {
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: calendlyWidget,
        prefill: {},
        utm: {},
      })
    } else {
      // Show placeholder if Calendly URL is not set
      calendlyWidget.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 500px; background-color: #f9fafb; border: 2px dashed #d1d5db; border-radius: 8px;">
                    <div style="text-align: center; color: #6b7280;">
                        <h3 style="margin-bottom: 1rem;">Calendly Widget Placeholder</h3>
                        <p>Replace YOUR_CALENDLY_URL with your actual Calendly URL</p>
                    </div>
                </div>
            `
    }
  }
})

// ===== GOOGLE FORM HANDLING =====
document.addEventListener("DOMContentLoaded", () => {
  const googleFormIframe = document.querySelector('iframe[src="GOOGLE_FORM_URL"]')

  if (googleFormIframe) {
    // Show placeholder if Google Form URL is not set
    googleFormIframe.style.display = "none"

    const placeholder = document.createElement("div")
    placeholder.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            height: 600px;
            background-color: #f9fafb;
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            margin: 2rem 0;
        `

    placeholder.innerHTML = `
            <div style="text-align: center; color: #6b7280;">
                <h3 style="margin-bottom: 1rem; color: #111827;">Google Form Placeholder</h3>
                <p>Replace GOOGLE_FORM_URL with your actual Google Form embed URL</p>
                <p style="font-size: 0.875rem; margin-top: 1rem;">
                    To get the embed URL: Go to your Google Form → Send → Embed HTML → Copy the src URL
                </p>
            </div>
        `

    googleFormIframe.parentNode.insertBefore(placeholder, googleFormIframe)
  }
})

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="placeholder.svg"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.classList.add("fade-in")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// ===== UTILITY FUNCTIONS =====
// Debounce function for performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener("DOMContentLoaded", () => {
  // Add keyboard navigation for custom elements
  const interactiveElements = document.querySelectorAll(".case-card, .feature-card, .session-card")

  interactiveElements.forEach((element) => {
    element.setAttribute("tabindex", "0")

    element.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        const link = this.querySelector("a")
        if (link) {
          e.preventDefault()
          link.click()
        }
      }
    })
  })

  // Announce page changes for screen readers
  const pageTitle = document.title
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = `Page loaded: ${pageTitle}`
  document.body.appendChild(announcement)
})

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)

  // In production, you might want to send errors to a logging service
  // Example: sendErrorToLoggingService(e.error);
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
  e.preventDefault()
})
