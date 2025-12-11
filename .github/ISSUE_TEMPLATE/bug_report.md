name: Bug Report
description: Report a bug in the blog platform
title: "[BUG] "
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you for reporting a bug! Please fill out the form below with as much detail as possible.
  - type: textarea
    attributes:
      label: Describe the bug
      description: A clear and concise description of what the bug is.
      placeholder: What went wrong?
    validations:
      required: true
  - type: textarea
    attributes:
      label: Steps to reproduce
      description: Steps to reproduce the behavior
      placeholder: |
        1. Go to...
        2. Click on...
        3. See error...
    validations:
      required: true
  - type: textarea
    attributes:
      label: Expected behavior
      description: What should happen instead?
    validations:
      required: true
  - type: textarea
    attributes:
      label: Environment
      description: |
        - Docker version:
        - OS:
        - Browser:
      placeholder: |
        Docker version: (output of `docker --version`)
        OS: Windows/Mac/Linux
        Browser: Chrome/Firefox/Safari/etc.
    validations:
      required: false
  - type: textarea
    attributes:
      label: Additional context
      description: Add any other context about the problem
    validations:
      required: false
