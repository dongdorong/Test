# Operation Form

이 문서는 운영(Operations) 관련 Form 정의입니다.

```yaml
| 항목 | 값 |
|---|---|
| formId | `operation_form` |
| version | `1.0.0` |

## Fields 정의

| ID | 라벨 | 타입 | Create 필수 | Edit 필수 | Placeholder | 최대 길이 | Validation |
|---|---|---|---|---|---|---|---|
| company_name | 고객사명 | text | true | false | 고객사명을 입력해주세요 | 50 | - |
| email | 담당자 이메일 | email | false | false | - | - | email |

```
