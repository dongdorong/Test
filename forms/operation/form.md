# Operation Form

이 문서는 운영(Operations) 관련 Form 정의입니다.

```yaml
formId: operation_form
version: 1.0.0

fields:
  - id: company_name
    label: 고객사명
    type: text
    required:
      create: true
      edit: false
    placeholder: 고객사명을 입력해주세요
    maxLength: 50

  - id: email
    label: 담당자 이메일
    type: email
    required:
      create: false
      edit: false
    validation: email
```