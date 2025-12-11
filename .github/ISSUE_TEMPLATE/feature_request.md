name: Feature Request
description: Suggest an idea for the blog platform
title: "[FEATURE] "
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you for suggesting a feature! Please describe your feature request below.
  - type: textarea
    attributes:
      label: Is your feature request related to a problem?
      description: Describe the problem you're trying to solve
      placeholder: "I'm frustrated when..."
    validations:
      required: false
  - type: textarea
    attributes:
      label: Describe the solution you'd like
      description: A clear description of what you want to happen
    validations:
      required: true
  - type: textarea
    attributes:
      label: Describe alternatives you've considered
      description: Other solutions or features you've considered
    validations:
      required: false
  - type: textarea
    attributes:
      label: Additional context
      description: Add any other context or screenshots
    validations:
      required: false
