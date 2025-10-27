# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Employee Performance Review Generator" [level=1] [ref=e3]
  - paragraph [ref=e4]: Generate a performance review summary by providing the employee's name and performance ratings.
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]: "Employee Name:"
      - textbox "Employee Name:" [active] [ref=e8]:
        - /placeholder: e.g., Jane Doe
        - text: Alice Smith
    - generic [ref=e9]:
      - generic [ref=e10]: "Quality of Work:"
      - combobox "Quality of Work:" [ref=e11]:
        - option "Exceeds Expectations" [selected]
        - option "Meets Expectations"
        - option "Needs Improvement"
    - generic [ref=e12]:
      - generic [ref=e13]: "Communication:"
      - combobox "Communication:" [ref=e14]:
        - option "Exceeds Expectations"
        - option "Meets Expectations" [selected]
        - option "Needs Improvement"
    - generic [ref=e15]:
      - generic [ref=e16]: "Collaboration:"
      - option "Needs Improvement" [ref=e17]
    - button "Generate Review" [ref=e18] [cursor=pointer]
  - generic [ref=e19]:
    - heading "Generated Review" [level=2] [ref=e20]
    - textbox [ref=e21]
    - button "Copy to Clipboard" [ref=e22] [cursor=pointer]
```