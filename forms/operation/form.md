# 고객사 정보 등록 Form

설명은 여기 자유롭게 써도 됨.

```yaml
formId: customer_form
version: 1.0.2

fields:
  - id: company_name
    label: 고객사명
    type: text
    required:
      create: true
      edit: false
    placeholder: 고객사명을 입력해주세요
    maxLength: 50

  - id: biz_number
    label: 법인등록번호
    type: text
    required:
      create: true
      edit: false
    format: "000-00-00000"

  - id: email
    label: 담당자 이메일
    type: email
    required:
      create: false
      edit: false
    validation: email
