// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('open_schedule', ['ionic', 'ngCordova']) 

// home page controller that loads the page... may be this can be put in as a service later on
/* TODO : put in service */

.controller('mainController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;

  var fData = new FormData();
  var vSt2 = "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ZSBkZSBCZWF1cHLDqSBCbGFjayBMYWtlOiBBcsOpbmEgZGUgQmxhY2sgTGFrZSRDaGFybGVzYm91cmc6IEFyw6luYSBSw6lqZWFuIExlbWVsaW4nQ2hhcmxlc2JvdXJnOiBBcnBpZHJvbWUgZGUgQ2hhcmxlc2JvdXJnHENsZXJtb250OiBBcsOpbmEgZGUgQ2xlcm1vbnQhRGlzcmHDq2xpOiBBcsOpbmEgNzYgZGUgRGlzcmHDq2xpKkRvbm5hY29uYTogQ2VudHJlIFLDqWNyw6lhdGlmIGRlIERvbm5hY29uYSRFYXN0IEJyb3VnaHRvbjogQXLDqW5hIE1hcmlvIExlc3NhcmQmTGEgUG9jYXRpw6hyZTogQXLDqW5hIGRlIGxhIFBvY2F0acOocmUgTGFjIEV0Y2hlbWluOiBBcsOpbmEgU2ltb24gTm9sZXQdTGF1em9uOiBBcsOpbmEgQW5kcsOpIExhY3JvaXgYTMOpdmlzOiBBcsOpbmEgZGUgTMOpdmlzLEzDqXZpcyAoQ2hhcm55KTogQXF1YXLDqW5hIEzDqW8tUGF1bC1Cw6lkYXJkRkzDqXZpcyAoU2FpbnQtRXRpZW5uZS1kZS1MYXV6b24pOiBDZW50cmUgQnJ1bm8gVmVycmV0LCBnbGFjZSBPbHltcGlxdWUsTMOpdmlzIChTYWludC1Sb211YWxkKTogQXLDqW5hIGRlIFN0LVJvbXVhbGQ5TMOpdmlzIChTYWludC1Sb211YWxkKTogQ29tcGxleGUgMiBnbGFjZXMgSG9uY28sIGdsYWNlICMxOUzDqXZpcyAoU2FpbnQtUm9tdWFsZCk6IENvbXBsZXhlIDIgZ2xhY2VzIEhvbmNvLCBnbGFjZSAjMjJMw6l2aXMgKFN0LUV0aWVubmUtZGUtTGF1em9uKTogQ2VudHJlIEJydW5vIFZlcnJldB9Mw6l2aXMgKFN0LU5pY29sYXMpOiBBcsOpbmEgQlNSIUxvcmV0dGV2aWxsZTogUGF2aWxsb24gZGVzIFNwb3J0cx5Nb250bWFnbnk6IEFyw6luYSBkZSBNb250bWFnbnkqUG9udC1Sb3VnZTogQ2VudHJlLVLDqWNyw6lhdGlmIEpvw6ktSnVuZWF1FVF1w6liZWM6IEFyw6luYSBCYXJkeRhRdcOpYmVjOiBBcsOpbmEgRHViZXJnZXIaUXXDqWJlYzogQXLDqW5hIExlcyBTYXVsZXMsUXXDqWJlYzogQXLDqW5hIE5ldWZjaMOidGVsIChNaWNoZWwgTGFiYWRpZSkXUXXDqWJlYzogQ29saXPDqWUgUGVwc2krU2FpbnQtQWdhcGl0OiBDZW50cmUgU3BvcnRpZiBHLi1ILiBWZXJtZXR0ZUdTYWludC1BbnNlbG1lIC8gSG9uZmxldXIgZGUgQmVsbGVjaGFzc2U6IEMuIFMuIEJlbGxlY2hhc3NlIC8gRG9yY2hlc3RlcjFTYWludC1BdWd1c3RpbjogQ2VudHJlIFNwb3J0aWYgQWN0aS1WaXRhbCBHbGFjZSBBMVNhaW50LUF1Z3VzdGluOiBDZW50cmUgU3BvcnRpZiBBY3RpLVZpdGFsIEdsYWNlIEJFU2FpbnQtQXVndXN0aW4tZGUtRGVzbWF1cmVzOiBDb21wbGV4ZSBzcG9ydGlmIGRlIFN0LUF1Z3VzdGluLCBHbGFjZSBBRVNhaW50LUF1Z3VzdGluLWRlLURlc21hdXJlczogQ29tcGxleGUgc3BvcnRpZiBkZSBTdC1BdWd1c3RpbiwgR2xhY2UgQjJTYWludC1DaGFybGVzIGRlIEJlbGxlY2hhc3NlOiBBcsOpbmEgZGUgU3QtQ2hhcmxlcyhTYWludC1Dw7RtZS1MaW5pw6hyZTogQXLDqW5hIGRlIFN0LUPDtG1lPFNhaW50LURhbWllbiBkZSBCZWxsZWNoYXNzZTogQXLDqW5hIFLDqWdpb25hbGUgSiBFIE3DqXRpdmllckBTYWludC3DiWRvdWFyZCBkZSBGcmFtcHRvbjogTG9pc2lycyBkZSBTYWludC1FZG91YXJkLWRlLUZyYW1wdG9uK1NhaW50LUVwaHJlbSBkZSBCZWF1Y2U6IEFyw6luYSBkZSBTdC1FcGhyZW01U2FpbnQtSGVucmktZGUtTMOpdmlzOiBDZW50cmUgcsOpY3LDqWF0aWYgZGUgU3QtSGVucmksU2FpbnQtSXNpZG9yZSBkZSBCZWF1Y2U6IEFyZW5hIGRlIFN0LUlzaWRvcmUlU2FpbnQtSmVhbiBQb3J0IEpvbGk6IENlbnRyZSBSb3Vzc2VhdStTYWludC1Kb3NlcGggZGUgQmVhdWNlOiBBcsOpbmEgZGUgU3QtSm9zZXBoOVNhaW50LUpvc2VwaCBkZSBDb2xlcmFpbmU6IENlbnRyZSBTcG9ydGlmIE9kaWxsb24gR3JlbmllcjtTYWludC1NYXJjIGRlcyBDYXJyacOocmVzOiBBcsOpbmEgZGUgU3QtTWFyYyBkZXMgQ2FycmnDqHJlcyVTYWludC1QYW1waGlsZTogQXLDqW5hIGRlIFN0LVBhbXBoaWxlL1NhaW50LVBhc2NhbCBkZSBLYW1vdXJhc2thOiBBcsOpbmEgZGUgU3QtUGFzY2FsLVNhaW50LVByb3NwZXIgZGUgQmVhdWNlOiBBcsOpbmEgZGUgU3QtUHJvc3BlciNTYWludC1SYXltb25kOiBBcsOpbmEgZGUgU3QtUmF5bW9uZDJTYWludGUtQ2xhaXJlIGRlIEJlbGxlY2hhc3NlOiBBcsOpbmEgZGUgU3RlLUNsYWlyZURTYWludGUtQ3JvaXggZGUgTG90YmluacOocmU6IENlbnRyZSBTcG9ydGlmIGV0IGN1bHR1cmVsIGRlIFN0ZS1Dcm9peCtTYWludGUtRm95OiBBcsOpbmEgZGUgU3RlLUZveSAoUi5Db3VpbGxhcmQpI1NhaW50ZS1Gb3k6IEFyw6luYSBSb2JlcnQgQ2hldmFsaWVyF1NhaW50ZS1Gb3k6IFBhdGlub2Ryb21lJ1NhaW50ZS1Gb3k6IFBFUFMgZGUgTCdVbml2ZXJzaXTDqSBMYXZhbDFTYWludGUtTWFyaWUgZGUgQmVhdWNlOiBDZW50cmUgQ2F6dGVsLCBEZXNqYXJkaW5zLVNhaW50ZS1NYXJpZSBkZSBCZWF1Y2U6IENlbnRyZSBDYXp0ZWwsIFBvdWxpbh5TaWxsZXJ5OiBBcsOpbmEgSmFjcXVlcyBDw7R0w6kgU3QtR8OpZMOpb246IEFyw6luYSBNYXJjZWwtRHV0aWwdU3QtR2VvcmdlczogUGFsYWlzIGRlcyBTcG9ydHMqU3QtR2lsbGVzOiBDZW50cmUgUsOpY3LDqWF0aWYgZGUgU3QtR2lsbGVzJVRoZXRmb3JkLU1pbmVzOiBDZW50cmUgTWFyaW8gR29zc2VsaW4vVmFsLULDqWxhaXI6IEFyw6luYSBMZXMgMiBHbGFjZXMgZGUgVmFsLULDqWxhaXIlVmFsY2FydGllcjogQXLDqW5hIENsw6ltZW50IEJvdWxhbmdlchhWYW5pZXI6IEFyw6luYSBkZSBWYW5pZXIGVG91dGVzFUkBMQI2NgI2NwEyATMBNAE1ATYBNwE5AjEwAjExAjEzAjE0AjE1AjE2AjE4AjE3AjE5AjIwAjEyAjY1AjU4AjcwAjcxAjQwATgCMjECMjICMjMCMjYCMjcCMjgCMjkCMjUCMzACMzECMzICNjgCNzMCNzQCMzMCMzUCMzcCMzgCMzkCNDcCNDgCNDkCNTACNTECNTICNTQCNTUCNTYCNTcCMzQCMzYCNjkCNDECNDMCNDICNTMCNjQCNTkCNDQCNDUCNDYCNjACNjECNjICNjMCLTEUKwNJZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAkhkAgMPZBYCAgEPFgIfCWgWAgIBDzwrAA0AZAIEDxYCHwloFgQCAw88KwANAGQCBQ88KwANAGQCAQ8WAh8JaBYKAhQPEGQQFQ0QQXVjdW4gY2hhbmdlbWVudBRBTiAtIFBhcnRpZSBhbm51bMOpZRhDQSAtIENoYW5nZW1lbnQgZCdhcsOpbmEaQ0MgLSBDaGFuZ2VtZW50IGRlIGPDqWR1bGUXQ0QgLSBDaGFuZ2VtZW50IGRlIGRhdGUZQ0UgLSBDaGFuZ2VtZW50IGQnw6lxdWlwZSpDRyAtIENoYW5nZW1lbnQgZGVtYW5kw6kgcGFyIHVuIGdvdXZlcm5ldXIXQ0ggLSBDaGFuZ2VtZW50IGQnaGV1cmUcQ1QgLSBDaGFuZ2VtZW50IHBvdXIgdG91cm5vaShFQyAtIEVycmV1ciBkZSBjw6lkdWxlIGRlcyBvcmdhbmlzYXRpb25zNk5DIC0gUGFydGllIG5vbiBjw6lkdWzDqWUgbG9ycyBkdSBkw6lww7R0IGRlcyBjw6lkdWxlcyNURSAtIENoYW5nZW1lbnQgZMO7IMOgIHVuZSB0ZW1ww6p0ZStUUCAtIENoYW5nZW1lbnQgZMO7IMOgIHVuIHRvdXJub2kgcHJvdMOpZ8OpFQ0BMAExATIBMwE0ATUBNgE3ATgBOQIxMAIxMQIxMhQrAw1nZ2dnZ2dnZ2dnZ2dnFgBkAhgPEGQQFfEBCE5PVklDRSBBCUFsbGnDqXMtMQ3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTINw4ljbGFpcmV1cnMtMwdIdXNreS0xB0h1c2t5LTIHSHVza3ktMwdIdXNreS00DlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yCVJhcGlkZXMtMQlSYXBpZGVzLTILU2VpZ25ldXJzLTELU2VpZ25ldXJzLTIMU8OpbmF0ZXVycy0xDFPDqW5hdGV1cnMtMghOT1ZJQ0UgQglBbGxpw6lzLTEJQWxsacOpcy0yDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMg3DiWNsYWlyZXVycy0zDcOJY2xhaXJldXJzLTQHSHVza3ktMQdIdXNreS0yB0h1c2t5LTMHSHVza3ktNAdIdXNreS01DlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yDlBvaW50ZS1Mw6l2eS0zCVJhcGlkZXMtMQlSYXBpZGVzLTIJUmFwaWRlcy0zC1NlaWduZXVycy0xC1NlaWduZXVycy0yC1NlaWduZXVycy0zDFPDqW5hdGV1cnMtMQxTw6luYXRldXJzLTIMU8OpbmF0ZXVycy0zCE5PVklDRSBDCUFsbGnDqXMtMQ3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTINw4ljbGFpcmV1cnMtMw3DiWNsYWlyZXVycy00B0h1c2t5LTEHSHVza3ktMgdIdXNreS0zB0h1c2t5LTQKSHVza3ktRsOpbQ5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMg5Qb2ludGUtTMOpdnktMwlSYXBpZGVzLTEJUmFwaWRlcy0yCVJhcGlkZXMtMwtTZWlnbmV1cnMtMQtTZWlnbmV1cnMtMgxTw6luYXRldXJzLTEMU8OpbmF0ZXVycy0yDFPDqW5hdGV1cnMtMwdBVE9NRSBBCUFsbGnDqXMtMQlBbGxpw6lzLTINw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yB0h1c2t5LTEHSHVza3ktMgpIdXNreS1Gw6ltDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yCVJhcGlkZXMtMQlSYXBpZGVzLTILU2VpZ25ldXJzLTELU2VpZ25ldXJzLTIMU8OpbmF0ZXVycy0xB0FUT01FIEIJQWxsacOpcy0xCUFsbGnDqXMtMg3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTINw4ljbGFpcmV1cnMtMwdIdXNreS0xB0h1c2t5LTIHSHVza3ktMw5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMg5Qb2ludGUtTMOpdnktMwlSYXBpZGVzLTEJUmFwaWRlcy0yC1NlaWduZXVycy0xC1NlaWduZXVycy0yDFPDqW5hdGV1cnMtMQxTw6luYXRldXJzLTIHQVRPTUUgQwlBbGxpw6lzLTENw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yDcOJY2xhaXJldXJzLTMHSHVza3ktMQdIdXNreS0yB0h1c2t5LTMKSHVza3ktRsOpbQ5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMglSYXBpZGVzLTEJUmFwaWRlcy0yC1NlaWduZXVycy0xDFPDqW5hdGV1cnMtMQhQRUVXRUUgQQlBbGxpw6lzLTEJQWxsacOpcy0yDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMgdIdXNreS0xB0h1c2t5LTIHSHVza3ktMwpIdXNreS1Gw6ltDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yCVJhcGlkZXMtMQlSYXBpZGVzLTILU2VpZ25ldXJzLTELU2VpZ25ldXJzLTIMU8OpbmF0ZXVycy0xDFPDqW5hdGV1cnMtMghQRUVXRUUgQglBbGxpw6lzLTEJQWxsacOpcy0yDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMg3DiWNsYWlyZXVycy0zB0h1c2t5LTEHSHVza3ktMgdIdXNreS0zDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yDlBvaW50ZS1Mw6l2eS0zCVJhcGlkZXMtMQtTZWlnbmV1cnMtMQtTZWlnbmV1cnMtMgxTw6luYXRldXJzLTEIUEVFV0VFIEMJQWxsacOpcy0xDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMgdIdXNreS0xB0h1c2t5LTIOUG9pbnRlLUzDqXZ5LTEOUG9pbnRlLUzDqXZ5LTIJUmFwaWRlcy0xC1NlaWduZXVycy0xDFPDqW5hdGV1cnMtMQhCQU5UQU0gQQlBbGxpw6lzLTENw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yDcOJY2xhaXJldXJzLTMHSHVza3ktMQdIdXNreS0yB0h1c2t5LTMOUG9pbnRlLUzDqXZ5LTEOUG9pbnRlLUzDqXZ5LTIOUG9pbnRlLUzDqXZ5LTMJUmFwaWRlcy0xC1NlaWduZXVycy0xDFPDqW5hdGV1cnMtMQxTw6luYXRldXJzLTIIQkFOVEFNIEIJQWxsacOpcy0xDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMg3DiWNsYWlyZXVycy0zB0h1c2t5LTEHSHVza3ktMgdIdXNreS0zDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yCVJhcGlkZXMtMQlSYXBpZGVzLTILU2VpZ25ldXJzLTELU2VpZ25ldXJzLTIMU8OpbmF0ZXVycy0xDFPDqW5hdGV1cnMtMghNSURHRVQgQQlBbGxpw6lzLTENw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yB0h1c2t5LTEHSHVza3ktMg5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMglSYXBpZGVzLTELU2VpZ25ldXJzLTEMU8OpbmF0ZXVycy0xDFPDqW5hdGV1cnMtMghNSURHRVQgQglBbGxpw6lzLTENw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yDcOJY2xhaXJldXJzLTMHSHVza3ktMQdIdXNreS0yB0h1c2t5LTMOUG9pbnRlLUzDqXZ5LTEOUG9pbnRlLUzDqXZ5LTIRUG9pbnRlLUzDqXZ5LUbDqW0JUmFwaWRlcy0xCVJhcGlkZXMtMgtTZWlnbmV1cnMtMQtTZWlnbmV1cnMtMgxTw6luYXRldXJzLTEMU8OpbmF0ZXVycy0yCEpVTklPUiBBDENoZXZhbGllcnMtMQlEaWFibG9zLTENw4ljbGFpcmV1cnMtMQ1Hb3V2ZXJuZXVycy0xB0h1c2t5LTEKTXVzdGFuZ3MtMQ5Qb2ludGUtTMOpdnktMQlSYXBpZGVzLTEIUm95YXV4LTEMU8OpbmF0ZXVycy0xCEpVTklPUiBCCUFsbGnDqXMtMQ3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTINR291dmVybmV1cnMtMQ1Hb3V2ZXJuZXVycy0yB0h1c2t5LTEHSHVza3ktMgpNdXN0YW5ncy0xDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yCVJhcGlkZXMtMQhSb3lhdXgtMQtTZWlnbmV1cnMtMQxTw6luYXRldXJzLTEV8QEAAzExNwMxMzcDMTM4AzEzOQMyMTQDMjE1AzIxNgMyMTcCNTgCNTkCMzACMzECOTMCOTQDMTc4AzE3OQADMTE4AzExOQMxNDADMTQxAzE0MgMxNDMDMjE4AzIxOQMyMjADMjIxAzIzMQI2MAI2MQI2MgIzMwIzNAIzNQI5NQI5NgI5NwMxODADMTgxAzE4MgADMTIwAzE0NAMxNDUDMTQ2AzE0NwMyMjIDMjIzAzIyNAMyMjUDMjMyAjYzAjY0AjY1AjM2AjM3AjMyAjk4Ajk5AzE4MwMxODQDMTg1AAMxMjEDMTIyAzE0OAMxNDkBMQEyAzIyNwI2NgI2NwIzOAIzOQMxMDADMTAxAzE4NgADMTIzAzEyNAMxNTADMTUxAzE1MgEzATQBNQI2OAI2OQI3MAI0MAI0MQMxMDIDMTAzAzE4NwMxODgAAzEyNQMxNTMDMTU0AzE1NQE2ATcBOAMyMjYCNzECNzICNDICNDMDMTA0AzE4OQADMTI2AzEyNwMxNTYDMTU3ATkCMTACMTEDMjI4AjczAjc0AjQ0AjQ1AzEwNQMxMDYDMTkwAzE5MQADMTI4AzEyOQMxNTgDMTU5AzE2MAIxMgIxMwIxNAI3NQI3NgI3NwI0NgMxMDcDMTA4AzE5MgADMTMwAzE2MQMxNjICMTUCMTYCNzgCNzkCNDgDMTA5AzE5NAADMTMxAzE2MwMxNjQDMTY1AjE3AjE4AjE5AjgwAjgxAjgyAjQ5AzExMAMxOTUDMTk2AAMxMzIDMTY2AzE2NwMxNjgCMjACMjECMjICODMCODQCNTACNTEDMTExAzExMgMxOTcDMTk4AAMxMzMDMTY5AzE3MAIyMwIyNAI4NQI4NgI1MgMxMTMDMTk5AzIwMAADMTM0AzE3MgMxNzMDMTc0AjI1AjI2AjI3Ajg3Ajg4Ajg5AjU0AjU1AzExNAMxMTUDMjAxAzIwMgADMjEwAzIwNwMxNzUDMjExAjI4AzIwNQI5MAI1NgMyMDgDMjAzAAMxMzYDMTc2AzE3NwMyMTIDMjEzAjI5AzIyOQMyMDYCOTECOTICNTcDMjA5AzIzMAMyMDQUKwPxAWdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2cWAQIBZAIZDxBkEBXxAQhOT1ZJQ0UgQQlBbGxpw6lzLTENw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yDcOJY2xhaXJldXJzLTMHSHVza3ktMQdIdXNreS0yB0h1c2t5LTMHSHVza3ktNA5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMglSYXBpZGVzLTEJUmFwaWRlcy0yC1NlaWduZXVycy0xC1NlaWduZXVycy0yDFPDqW5hdGV1cnMtMQxTw6luYXRldXJzLTIITk9WSUNFIEIJQWxsacOpcy0xCUFsbGnDqXMtMg3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTINw4ljbGFpcmV1cnMtMw3DiWNsYWlyZXVycy00B0h1c2t5LTEHSHVza3ktMgdIdXNreS0zB0h1c2t5LTQHSHVza3ktNQ5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMg5Qb2ludGUtTMOpdnktMwlSYXBpZGVzLTEJUmFwaWRlcy0yCVJhcGlkZXMtMwtTZWlnbmV1cnMtMQtTZWlnbmV1cnMtMgtTZWlnbmV1cnMtMwxTw6luYXRldXJzLTEMU8OpbmF0ZXVycy0yDFPDqW5hdGV1cnMtMwhOT1ZJQ0UgQwlBbGxpw6lzLTENw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yDcOJY2xhaXJldXJzLTMNw4ljbGFpcmV1cnMtNAdIdXNreS0xB0h1c2t5LTIHSHVza3ktMwdIdXNreS00Ckh1c2t5LUbDqW0OUG9pbnRlLUzDqXZ5LTEOUG9pbnRlLUzDqXZ5LTIOUG9pbnRlLUzDqXZ5LTMJUmFwaWRlcy0xCVJhcGlkZXMtMglSYXBpZGVzLTMLU2VpZ25ldXJzLTELU2VpZ25ldXJzLTIMU8OpbmF0ZXVycy0xDFPDqW5hdGV1cnMtMgxTw6luYXRldXJzLTMHQVRPTUUgQQlBbGxpw6lzLTEJQWxsacOpcy0yDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMgdIdXNreS0xB0h1c2t5LTIKSHVza3ktRsOpbQ5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMglSYXBpZGVzLTEJUmFwaWRlcy0yC1NlaWduZXVycy0xC1NlaWduZXVycy0yDFPDqW5hdGV1cnMtMQdBVE9NRSBCCUFsbGnDqXMtMQlBbGxpw6lzLTINw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yDcOJY2xhaXJldXJzLTMHSHVza3ktMQdIdXNreS0yB0h1c2t5LTMOUG9pbnRlLUzDqXZ5LTEOUG9pbnRlLUzDqXZ5LTIOUG9pbnRlLUzDqXZ5LTMJUmFwaWRlcy0xCVJhcGlkZXMtMgtTZWlnbmV1cnMtMQtTZWlnbmV1cnMtMgxTw6luYXRldXJzLTEMU8OpbmF0ZXVycy0yB0FUT01FIEMJQWxsacOpcy0xDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMg3DiWNsYWlyZXVycy0zB0h1c2t5LTEHSHVza3ktMgdIdXNreS0zCkh1c2t5LUbDqW0OUG9pbnRlLUzDqXZ5LTEOUG9pbnRlLUzDqXZ5LTIJUmFwaWRlcy0xCVJhcGlkZXMtMgtTZWlnbmV1cnMtMQxTw6luYXRldXJzLTEIUEVFV0VFIEEJQWxsacOpcy0xCUFsbGnDqXMtMg3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTIHSHVza3ktMQdIdXNreS0yB0h1c2t5LTMKSHVza3ktRsOpbQ5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMglSYXBpZGVzLTEJUmFwaWRlcy0yC1NlaWduZXVycy0xC1NlaWduZXVycy0yDFPDqW5hdGV1cnMtMQxTw6luYXRldXJzLTIIUEVFV0VFIEIJQWxsacOpcy0xCUFsbGnDqXMtMg3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTINw4ljbGFpcmV1cnMtMwdIdXNreS0xB0h1c2t5LTIHSHVza3ktMw5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMg5Qb2ludGUtTMOpdnktMwlSYXBpZGVzLTELU2VpZ25ldXJzLTELU2VpZ25ldXJzLTIMU8OpbmF0ZXVycy0xCFBFRVdFRSBDCUFsbGnDqXMtMQ3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTIHSHVza3ktMQdIdXNreS0yDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yCVJhcGlkZXMtMQtTZWlnbmV1cnMtMQxTw6luYXRldXJzLTEIQkFOVEFNIEEJQWxsacOpcy0xDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMg3DiWNsYWlyZXVycy0zB0h1c2t5LTEHSHVza3ktMgdIdXNreS0zDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yDlBvaW50ZS1Mw6l2eS0zCVJhcGlkZXMtMQtTZWlnbmV1cnMtMQxTw6luYXRldXJzLTEMU8OpbmF0ZXVycy0yCEJBTlRBTSBCCUFsbGnDqXMtMQ3DiWNsYWlyZXVycy0xDcOJY2xhaXJldXJzLTINw4ljbGFpcmV1cnMtMwdIdXNreS0xB0h1c2t5LTIHSHVza3ktMw5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMglSYXBpZGVzLTEJUmFwaWRlcy0yC1NlaWduZXVycy0xC1NlaWduZXVycy0yDFPDqW5hdGV1cnMtMQxTw6luYXRldXJzLTIITUlER0VUIEEJQWxsacOpcy0xDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMgdIdXNreS0xB0h1c2t5LTIOUG9pbnRlLUzDqXZ5LTEOUG9pbnRlLUzDqXZ5LTIJUmFwaWRlcy0xC1NlaWduZXVycy0xDFPDqW5hdGV1cnMtMQxTw6luYXRldXJzLTIITUlER0VUIEIJQWxsacOpcy0xDcOJY2xhaXJldXJzLTENw4ljbGFpcmV1cnMtMg3DiWNsYWlyZXVycy0zB0h1c2t5LTEHSHVza3ktMgdIdXNreS0zDlBvaW50ZS1Mw6l2eS0xDlBvaW50ZS1Mw6l2eS0yEVBvaW50ZS1Mw6l2eS1Gw6ltCVJhcGlkZXMtMQlSYXBpZGVzLTILU2VpZ25ldXJzLTELU2VpZ25ldXJzLTIMU8OpbmF0ZXVycy0xDFPDqW5hdGV1cnMtMghKVU5JT1IgQQxDaGV2YWxpZXJzLTEJRGlhYmxvcy0xDcOJY2xhaXJldXJzLTENR291dmVybmV1cnMtMQdIdXNreS0xCk11c3RhbmdzLTEOUG9pbnRlLUzDqXZ5LTEJUmFwaWRlcy0xCFJveWF1eC0xDFPDqW5hdGV1cnMtMQhKVU5JT1IgQglBbGxpw6lzLTENw4ljbGFpcmV1cnMtMQ3DiWNsYWlyZXVycy0yDUdvdXZlcm5ldXJzLTENR291dmVybmV1cnMtMgdIdXNreS0xB0h1c2t5LTIKTXVzdGFuZ3MtMQ5Qb2ludGUtTMOpdnktMQ5Qb2ludGUtTMOpdnktMglSYXBpZGVzLTEIUm95YXV4LTELU2VpZ25ldXJzLTEMU8OpbmF0ZXVycy0xFfEBAAMxMTcDMTM3AzEzOAMxMzkDMjE0AzIxNQMyMTYDMjE3AjU4AjU5AjMwAjMxAjkzAjk0AzE3OAMxNzkAAzExOAMxMTkDMTQwAzE0MQMxNDIDMTQzAzIxOAMyMTkDMjIwAzIyMQMyMzECNjACNjECNjICMzMCMzQCMzUCOTUCOTYCOTcDMTgwAzE4MQMxODIAAzEyMAMxNDQDMTQ1AzE0NgMxNDcDMjIyAzIyMwMyMjQDMjI1AzIzMgI2MwI2NAI2NQIzNgIzNwIzMgI5OAI5OQMxODMDMTg0AzE4NQADMTIxAzEyMgMxNDgDMTQ5ATEBMgMyMjcCNjYCNjcCMzgCMzkDMTAwAzEwMQMxODYAAzEyMwMxMjQDMTUwAzE1MQMxNTIBMwE0ATUCNjgCNjkCNzACNDACNDEDMTAyAzEwMwMxODcDMTg4AAMxMjUDMTUzAzE1NAMxNTUBNgE3ATgDMjI2AjcxAjcyAjQyAjQzAzEwNAMxODkAAzEyNgMxMjcDMTU2AzE1NwE5AjEwAjExAzIyOAI3MwI3NAI0NAI0NQMxMDUDMTA2AzE5MAMxOTEAAzEyOAMxMjkDMTU4AzE1OQMxNjACMTICMTMCMTQCNzUCNzYCNzcCNDYDMTA3AzEwOAMxOTIAAzEzMAMxNjEDMTYyAjE1AjE2Ajc4Ajc5AjQ4AzEwOQMxOTQAAzEzMQMxNjMDMTY0AzE2NQIxNwIxOAIxOQI4MAI4MQI4MgI0OQMxMTADMTk1AzE5NgADMTMyAzE2NgMxNjcDMTY4AjIwAjIxAjIyAjgzAjg0AjUwAjUxAzExMQMxMTIDMTk3AzE5OAADMTMzAzE2OQMxNzACMjMCMjQCODUCODYCNTIDMTEzAzE5OQMyMDAAAzEzNAMxNzIDMTczAzE3NAIyNQIyNgIyNwI4NwI4OAI4OQI1NAI1NQMxMTQDMTE1AzIwMQMyMDIAAzIxMAMyMDcDMTc1AzIxMQIyOAMyMDUCOTACNTYDMjA4AzIwMwADMTM2AzE3NgMxNzcDMjEyAzIxMwIyOQMyMjkDMjA2AjkxAjkyAjU3AzIwOQMyMzADMjA0FCsD8QFnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnFgECAWQCGg8QDxYCHgRSb3dzAh5kEBVIKUFuY2llbm5lLUxvcmV0dGU6IEFtcGhpZ2xhY2UgTWFyaW8gTWFyb2lzJUFuY2llbm5lLUxvcmV0dGU6IEMuUy5NLkEuTC4sIEdsYWNlIEElQW5jaWVubmUtTG9yZXR0ZTogQy5TLk0uQS5MLiwgR2xhY2UgQiRCYWllIFN0LVBhdWw6IEFyw6luYSBkZSBCYWllIFN0LVBhdWwiQmVhdWNldmlsbGU6IEFyw6luYSBkZSBCZWF1Y2V2aWxsZRtCZWF1cG9ydDogQXLDqW5hIGRlIEdpZmZhcmQgQmVhdXBvcnQ6IEFyw6luYSBHaWxsZXMgVHJlbWJsYXknQmVhdXBvcnQ6IENlbnRyZSBTcG9ydGlmIE1hcmNlbCBCw6lkYXJkIkJlYXVwcsOpOiBBcsOpbmEgY8O0dGUgZGUgQmVhdXByw6kgQmxhY2sgTGFrZTogQXLDqW5hIGRlIEJsYWNrIExha2UkQ2hhcmxlc2JvdXJnOiBBcsOpbmEgUsOpamVhbiBMZW1lbGluJ0NoYXJsZXNib3VyZzogQXJwaWRyb21lIGRlIENoYXJsZXNib3VyZxxDbGVybW9udDogQXLDqW5hIGRlIENsZXJtb250IURpc3Jhw6tsaTogQXLDqW5hIDc2IGRlIERpc3Jhw6tsaSpEb25uYWNvbmE6IENlbnRyZSBSw6ljcsOpYXRpZiBkZSBEb25uYWNvbmEkRWFzdCBCcm91Z2h0b246IEFyw6luYSBNYXJpbyBMZXNzYXJkJkxhIFBvY2F0acOocmU6IEFyw6luYSBkZSBsYSBQb2NhdGnDqHJlIExhYyBFdGNoZW1pbjogQXLDqW5hIFNpbW9uIE5vbGV0HUxhdXpvbjogQXLDqW5hIEFuZHLDqSBMYWNyb2l4GEzDqXZpczogQXLDqW5hIGRlIEzDqXZpcyxMw6l2aXMgKENoYXJueSk6IEFxdWFyw6luYSBMw6lvLVBhdWwtQsOpZGFyZEZMw6l2aXMgKFNhaW50LUV0aWVubmUtZGUtTGF1em9uKTogQ2VudHJlIEJydW5vIFZlcnJldCwgZ2xhY2UgT2x5bXBpcXVlLEzDqXZpcyAoU2FpbnQtUm9tdWFsZCk6IEFyw6luYSBkZSBTdC1Sb211YWxkOUzDqXZpcyAoU2FpbnQtUm9tdWFsZCk6IENvbXBsZXhlIDIgZ2xhY2VzIEhvbmNvLCBnbGFjZSAjMTlMw6l2aXMgKFNhaW50LVJvbXVhbGQpOiBDb21wbGV4ZSAyIGdsYWNlcyBIb25jbywgZ2xhY2UgIzIyTMOpdmlzIChTdC1FdGllbm5lLWRlLUxhdXpvbik6IENlbnRyZSBCcnVubyBWZXJyZXQfTMOpdmlzIChTdC1OaWNvbGFzKTogQXLDqW5hIEJTUiFMb3JldHRldmlsbGU6IFBhdmlsbG9uIGRlcyBTcG9ydHMeTW9udG1hZ255OiBBcsOpbmEgZGUgTW9udG1hZ255KlBvbnQtUm91Z2U6IENlbnRyZS1Sw6ljcsOpYXRpZiBKb8OpLUp1bmVhdRVRdcOpYmVjOiBBcsOpbmEgQmFyZHkYUXXDqWJlYzogQXLDqW5hIER1YmVyZ2VyGlF1w6liZWM6IEFyw6luYSBMZXMgU2F1bGVzLFF1w6liZWM6IEFyw6luYSBOZXVmY2jDonRlbCAoTWljaGVsIExhYmFkaWUpF1F1w6liZWM6IENvbGlzw6llIFBlcHNpK1NhaW50LUFnYXBpdDogQ2VudHJlIFNwb3J0aWYgRy4tSC4gVmVybWV0dGVHU2FpbnQtQW5zZWxtZSAvIEhvbmZsZXVyIGRlIEJlbGxlY2hhc3NlOiBDLiBTLiBCZWxsZWNoYXNzZSAvIERvcmNoZXN0ZXIxU2FpbnQtQXVndXN0aW46IENlbnRyZSBTcG9ydGlmIEFjdGktVml0YWwgR2xhY2UgQTFTYWludC1BdWd1c3RpbjogQ2VudHJlIFNwb3J0aWYgQWN0aS1WaXRhbCBHbGFjZSBCRVNhaW50LUF1Z3VzdGluLWRlLURlc21hdXJlczogQ29tcGxleGUgc3BvcnRpZiBkZSBTdC1BdWd1c3RpbiwgR2xhY2UgQUVTYWludC1BdWd1c3Rpbi1kZS1EZXNtYXVyZXM6IENvbXBsZXhlIHNwb3J0aWYgZGUgU3QtQXVndXN0aW4sIEdsYWNlIEIyU2FpbnQtQ2hhcmxlcyBkZSBCZWxsZWNoYXNzZTogQXLDqW5hIGRlIFN0LUNoYXJsZXMoU2FpbnQtQ8O0bWUtTGluacOocmU6IEFyw6luYSBkZSBTdC1Dw7RtZTxTYWludC1EYW1pZW4gZGUgQmVsbGVjaGFzc2U6IEFyw6luYSBSw6lnaW9uYWxlIEogRSBNw6l0aXZpZXJAU2FpbnQtw4lkb3VhcmQgZGUgRnJhbXB0b246IExvaXNpcnMgZGUgU2FpbnQtRWRvdWFyZC1kZS1GcmFtcHRvbitTYWludC1FcGhyZW0gZGUgQmVhdWNlOiBBcsOpbmEgZGUgU3QtRXBocmVtNVNhaW50LUhlbnJpLWRlLUzDqXZpczogQ2VudHJlIHLDqWNyw6lhdGlmIGRlIFN0LUhlbnJpLFNhaW50LUlzaWRvcmUgZGUgQmVhdWNlOiBBcmVuYSBkZSBTdC1Jc2lkb3JlJVNhaW50LUplYW4gUG9ydCBKb2xpOiBDZW50cmUgUm91c3NlYXUrU2FpbnQtSm9zZXBoIGRlIEJlYXVjZTogQXLDqW5hIGRlIFN0LUpvc2VwaDlTYWludC1Kb3NlcGggZGUgQ29sZXJhaW5lOiBDZW50cmUgU3BvcnRpZiBPZGlsbG9uIEdyZW5pZXI7U2FpbnQtTWFyYyBkZXMgQ2FycmnDqHJlczogQXLDqW5hIGRlIFN0LU1hcmMgZGVzIENhcnJpw6hyZXMlU2FpbnQtUGFtcGhpbGU6IEFyw6luYSBkZSBTdC1QYW1waGlsZS9TYWludC1QYXNjYWwgZGUgS2Ftb3VyYXNrYTogQXLDqW5hIGRlIFN0LVBhc2NhbC1TYWludC1Qcm9zcGVyIGRlIEJlYXVjZTogQXLDqW5hIGRlIFN0LVByb3NwZXIjU2FpbnQtUmF5bW9uZDogQXLDqW5hIGRlIFN0LVJheW1vbmQyU2FpbnRlLUNsYWlyZSBkZSBCZWxsZWNoYXNzZTogQXLDqW5hIGRlIFN0ZS1DbGFpcmVEU2FpbnRlLUNyb2l4IGRlIExvdGJpbmnDqHJlOiBDZW50cmUgU3BvcnRpZiBldCBjdWx0dXJlbCBkZSBTdGUtQ3JvaXgrU2FpbnRlLUZveTogQXLDqW5hIGRlIFN0ZS1Gb3kgKFIuQ291aWxsYXJkKSNTYWludGUtRm95OiBBcsOpbmEgUm9iZXJ0IENoZXZhbGllchdTYWludGUtRm95OiBQYXRpbm9kcm9tZSdTYWludGUtRm95OiBQRVBTIGRlIEwnVW5pdmVyc2l0w6kgTGF2YWwxU2FpbnRlLU1hcmllIGRlIEJlYXVjZTogQ2VudHJlIENhenRlbCwgRGVzamFyZGlucy1TYWludGUtTWFyaWUgZGUgQmVhdWNlOiBDZW50cmUgQ2F6dGVsLCBQb3VsaW4eU2lsbGVyeTogQXLDqW5hIEphY3F1ZXMgQ8O0dMOpIFN0LUfDqWTDqW9uOiBBcsOpbmEgTWFyY2VsLUR1dGlsHVN0LUdlb3JnZXM6IFBhbGFpcyBkZXMgU3BvcnRzKlN0LUdpbGxlczogQ2VudHJlIFLDqWNyw6lhdGlmIGRlIFN0LUdpbGxlcyVUaGV0Zm9yZC1NaW5lczogQ2VudHJlIE1hcmlvIEdvc3NlbGluL1ZhbC1Cw6lsYWlyOiBBcsOpbmEgTGVzIDIgR2xhY2VzIGRlIFZhbC1Cw6lsYWlyJVZhbGNhcnRpZXI6IEFyw6luYSBDbMOpbWVudCBCb3VsYW5nZXIYVmFuaWVyOiBBcsOpbmEgZGUgVmFuaWVyFUgBMQI2NgI2NwEyATMBNAE1ATYBNwE5AjEwAjExAjEzAjE0AjE1AjE2AjE4AjE3AjE5AjIwAjEyAjY1AjU4AjcwAjcxAjQwATgCMjECMjICMjMCMjYCMjcCMjgCMjkCMjUCMzACMzECMzICNjgCNzMCNzQCMzMCMzUCMzcCMzgCMzkCNDcCNDgCNDkCNTACNTECNTICNTQCNTUCNTYCNTcCMzQCMzYCNjkCNDECNDMCNDICNTMCNjQCNTkCNDQCNDUCNDYCNjACNjECNjICNjMUKwNIZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnFgBkAh8PD2QWAh4Fc3R5bGUFDWRpc3BsYXk6bm9uZTtkGAMFGG0kcGMkZ3ZDZWR1bGVBbHRlcm5hdGl2ZQ9nZAUNbSRwYyRndkNlZHVsZQ9nZAUObSRwYyRndkNoYW5nZXMPZ2T9QLjQa+EaHk0BxSQz6mleuoDS4w==";
  fData.append("__EVENTTARGET", "m$pc$cbCategories");
  fData.append("__EVENTARGUMENT", "");
  fData.append("__LASTFOCUS", "");
  fData.append("__VIEWSTATE", vSt2);
  fData.append("m$txtLogin", "");
  fData.append("m$txtPassword", "");
  fData.append("m$pc$cbYear", "2015");
  fData.append("m$pc$cbCategories", "-1");
  fData.append("m$pc$cbSemaine", "2015-11-2");
  fData.append("m$pc$cbArenaFilter", "-1");
  fData.append("m$hdnOnLoadMessage", "");
  fData.append("m$hdnOnLoadMessageOptions", "");
  
  var aURL = "http://lcrse.qc.ca/cedules.saison.aspx";

  $http({
      url: aURL,
      method: "POST",
      data: fData,
      headers: { 'Content-Type': undefined, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      },      
      transformResponse: function (data) { 
        return data; 
      }
      }).then(function (response) {
        self.huskyModel.ViewState = getViewState(response.data);
        self.huskyModel.clubList= getTeamModel(response.data);
  }); 
  
  self.selectClub = function(club) {
    self.huskyModel.setSelectedClub(club);
  };
  
  self.selectCategory = function(category) {
    self.huskyModel.setSelectedCategory(category);
  };
  
  self.selectLevel = function(level) {
    self.huskyModel.setSelectedLevel(level);
  };
  
  self.selectTeam = function(team) {
    self.huskyModel.setSelectedTeam(team);
  };
  
}])

.controller('gameController', ['$http', '$cordovaCalendar','huskyModel', function($http, $cordovaCalendar, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  var fData = new FormData();
  fData.append("__EVENTTARGET", "m$pc$cbSemaine");
  fData.append("__EVENTARGUMENT", "");
  fData.append("__LASTFOCUS", "");
  fData.append("__VIEWSTATE", self.huskyModel.ViewState);
  fData.append("m$txtLogin", "");
  fData.append("m$txtPassword", "");
  fData.append("m$pc$cbYear", "2015");
  fData.append("m$pc$cbCategories", "-1");
  fData.append("m$pc$cbEquipes", self.huskyModel.selectedTeam.id);
  fData.append("m$pc$cbSemaine", "-1");
  fData.append("m$pc$cbArenaFilter", "-1");
  fData.append("m$hdnOnLoadMessage", "");
  fData.append("m$hdnOnLoadMessageOptions", "");
  
  var aURL = "http://lcrse.qc.ca/cedules.saison.aspx";
  var stDate = null;
  
  $http({
      url: aURL,
      method: "POST",
      data: fData,
      headers: { 'Content-Type': undefined, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      },      
      transformResponse: function (data) { 
        return data; 
      }
      }).then(function (response) {
        self.huskyModel.ViewState = getViewState(response.data);
        self.huskyModel.selectedTeam.Dates = constructGameModel(response.data,self.huskyModel.selectedTeam.team);
        self.huskyModel.findEvents();
        // find calendar entries
        /*angular.forEach(self.huskyModel.selectedTeam.Dates, function (date){
          angular.forEach(date.Events, function(event){
            var tmpTmStr = event.time.split(':');
            date.date.addHours(parseInt(tmpTmStr[0]));
            date.date.addMinutes(parseInt(tmpTmStr[1]));
            $cordovaCalendar.findEvent({
                title: "Hockey - " + event.adversary +" - " + event.id,
                location: event.Location.city + event.Location.arena,
                notes: "Bonne partie! -" + event.id,
                startDate: date.date,
                endDate: date.date.addMinutes(120)
              }).then(function (result) {
                event.onCalendar = true;
              }, function (err) {
                alert(err);
                event.onCalendar = false;
              });
          });
        }); */
  });
  
  self.selectAllEvents = function() {
    self.huskyModel.selectAllEvents(self.huskyModel.selectedTeam.allEventsSelected);
  };
  
  var calendarList = [];
  var calNameList = [];
  var selectedCalendarName = null;
  

  
  /*$cordovaCalendar.listCalendars().then(function (result) {
    calendarList = result;
    angular.forEach(result, function(calentry){
      calNameList = calentry.name;
    });
    }, function (err) {
      alert("No calendars available");
  }); */
  
  /*$cordovaCalendar.listEventsInRange(
    new Date(2015, 11, 10, 0, 0, 0, 0, 0),
    new Date(2015, 11, 12, 0, 0, 0, 0, 0)
  ).then(function (result) {
    var t = 1;
    t++;
  }, function (err) {
    var t = 1;
    t++;
  });*/
  
  /*self.actionSheet = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
        buttons: calNameList,
        titleText: 'Choose Calendar',
        cancelText: 'Cancel',
        cancel: function() {
            // add cancel code..
        },
        buttonClicked: function(index) {
          selectedCalendarName = calendarList[index];
            return true;
        }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
        hideSheet();
    }, 0);

    }; */
    
  
  
  self.createEvents = function() {
    var stDate = null; // start date in Date format
    var enDate = null; // end date in Date format
    var eventFound = false;
    
    if(selectedCalendarName = null) {
      alert("Please select a calendar");
    } else {
    
      angular.forEach(self.huskyModel.selectedTeam.Dates, function (date){
        angular.forEach(date.Events, function(event){
          if (event.isSelected && !event.onCalendar) { // create event
            // Format date
            var tmpTmStr = event.time.split(':');
            stDate = date.date;
            stDate.addHours(parseInt(tmpTmStr[0]));
            stDate.addMinutes(parseInt(tmpTmStr[1]));
              $cordovaCalendar.createEvent({
                title: "Hockey - " + event.adversary +" - " + event.id,
                location: event.Location.city + event.Location.arena,
                notes: "Bonne partie! -" + event.id,
                startDate: stDate,
                endDate: stDate.addMinutes(120)
                //calendarName:selectedCalendarName
              }).then (function(result){
                event.onCalendar = true;
                alert("Event created (" + event.id + ")");
              }, function(err){
                alert(err);
              });
            } else if(event.isSelected && event.onCalendar){
              alert("Event already exists");
            }
        });
      });
    }
  }; 
  
  
}])


.service('huskyModel', ['$cordovaCalendar', '$q', function ($cordovaCalendar, $q) {
  var self = this;
  
  self.ViewState = null;
  self.isClubSelected = null;
  self.isGameSelected = false;
  self.isTeamSelected = false;
  self.isLevelSelected = false;
  self.isCategorySelected = false;
  
 
  // this is the complete model
  self.clubList = [];
  
 // this has to return the array... not the name
  self.selectedClub = null;
  self.setSelectedClub = function(club) {
    angular.forEach(self.clubList, function(clb) {
        if (clb.name == club.name) {
          self.selectedClub = clb;
        }
    });
  };
  
  // this has to return the array... not the name
  self.selectedCategory = null;
  self.setSelectedCategory = function(cat) {
    angular.forEach(self.selectedClub.Categories, function(category) {
        if (category.category == cat.category) {
          self.selectedCategory = category;
        }
    });
  };

  self.selectedLevel = null;
  self.setSelectedLevel = function(lvl) {
    angular.forEach(self.selectedCategory.Levels, function(level) {
        if (level.level == lvl.level) {
          self.selectedLevel = level;
        }
    });
  };
  
  self.selectedTeam = null;
  self.setSelectedTeam = function(tm) {
    angular.forEach(self.selectedLevel.Teams, function(team) {
        if (team.team == tm.team) {
          self.selectedTeam = team;
          self.isTeamSelected = true;
        }
    });
  };
  
  self.selectAllEvents = function(selected) {
    angular.forEach(self.selectedTeam.Dates, function(date){
      angular.forEach(date.Events, function(event){
        event.isSelected = selected;
      });
    });
  }
  
  self.findEvents = function() {
		
		var deferred = $q.defer();
		var foundEvents = [];
		var stDate = null;
		/*
		Logic is:
		For each, see if it exists an event.
		*/
		var promises = [];
		self.selectedTeam.Dates.forEach(function(date) {
			date.Events.forEach(function(event){
			  var tmpTmStr = event.time.split(":");
			  stDate = date.date;
        stDate.addHours(parseInt(tmpTmStr[0]));
        stDate.addMinutes(parseInt(tmpTmStr[1]));
        var subDate = new Date(parseInt(stDate));
			  promises.push($cordovaCalendar.findEvent({
  				title: "Hockey - " + event.adversary +" - " + event.id,
          location: event.Location.city + event.Location.arena,
          notes: "Bonne partie! -" + event.id,
          startDate: subDate,
          endDate: subDate.addMinutes(120)
			  }));
			});
		});
		
		$q.all(promises).then(function(results) {
			console.log("in the all done");	
			//should be the same len as events
			var t=1;
			deferred.resolve(results);
			t++;
		});
		
		return deferred.promise;
  }
  
  
}])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
  
  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https:/
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    /*.state('app', {
      abstract: true,
      templateUrl: 'templates/main.html'
    }) */
    
    .state('home', {
      url: '/home',
      views: {
        'home': {
          templateUrl: 'templates/clubs.html'
        }
      }
    })
    
    .state('levels', {
      url: '/levels',
      views: {
        'home': {
          templateUrl: 'templates/levels.html'
        }
      }
    })
    
    .state('categories', {
      url: '/categories',
      views: {
        'home': {
          templateUrl: 'templates/categories.html'
        }
      }
    })
    
    .state('teams', {
      url: '/teams',
      views: {
        'home': {
          templateUrl: 'templates/teams.html'
        }
      }
    })
    
    .state('games', {
      url: '/games',
      views: {
        'home': {
          templateUrl: 'templates/games.html'
        }
      }
    })
    
    .state('help', {
      url: '/help',
      views: {
        'help': {
          templateUrl: 'templates/help.html'
        }
      }
    })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
}); 

/* ==============================================

Data model

================================================*/

function dmClub(cl) {
  this.name = cl;
  this.currentCategory = null;
  this.Categories = [];
  
  this.setCurrentCategory = function(cat) {
    if (this.Categories.length == 0) {
      this.currentCategory = cat;
    } else {
      angular.forEach(this.Categories, function(category){
        if(cat.category == category.category) {
          this.currentCategory = category;
        }
      });
    }
  }
}

function dmCategory(cat) {
  this.category = cat;
  this.currentLevel = null;
  this.Levels = [];
  
  this.setCurrentLevel = function(lvl) {
    angular.forEach(this.Levels, function(level){
      if(lvl.level == level.level) {
        this.currentLevel = level;
      }
    });
  }
}

function dmLevel(lvl) {
  this.level = lvl;
  this.currentTeam = null;
  this.Teams = [];
  
  this.setCurrentTeam = function(tm) {
    angular.forEach(this.Teams, function(team){
      if(tm.id == team.id) {
        this.currentTeam = team;
      }
    });
  }
}

function dmTeam(id, tm) {
  this.id = id;
  this.team = tm;
  this.allEventsSelected;
  this.Dates = [];
}

function dmDate (dt) {
  // date: Date
  // isPassed: bool - flag for UI
  // Events: array of dmEvents
  this.date = dt;         
  this.isPassed = false;
  this.Events = [];
}

function dmEvent(id, tm, time, pg, loc, hg, gf, ga) {
    this.id = id;
    this.isHomeGame = hg;
    this.adversary = tm;
    this.time = time;
    this.type = pg;
    this.Location = loc; 
    this.isSelected = false;
    this.goalsFor = gf;
    this.goalsAgainst = ga;
    this.onCalendar = false;
    this.victory = null;
    if (gf != null) {
      if(gf==ga) {
        this.victory = "N";
      } else if (gf > ga) {
        this.victory = "V";
      } else {
        this.victory = "D";
      }
    }
}

function dmLocation (ar, crd, cty, ph, web) {
  this.arena = ar;
  this.coordinates = crd;
  this.city = cty;
  this.phone = ph;
  this.web = web;
}

/* ==============================================

Model fuctions

================================================*/

function getTeamModel(htmlStr) {

  var foundClub = false;
  var clubList = [];
  var newClub = null;
  var newTeam = null;
  var newLevel = null;
  //var newLvlBool = false;
  var newCategory = null;
  //var newCatBool = false;
  var catStr;
  var lvlStr;
  var clubStr;
  
  
  var trList = parseInitial(htmlStr); // collection of options
  
  for (var i = 0; i < trList.length; i++) {  // loop through teams to single them out and create the vm
    foundClub = false;
    if (trList[i].indexOf('separator') > 0) {   // always a new level in a category
      catStr = getCategoryParse(trList[i]);
      lvlStr = getLevelParse(trList[i]);
      
      newLevel = new dmLevel(lvlStr); // always new level
      
      // check if new category
      if (newCategory != null) {
        if(catStr != newCategory.category) { // new category
          newCategory = new dmCategory(catStr);
        }
      } else {
        newCategory = new dmCategory(catStr);
      }
      
    } else {
      // need to pass strings and create new instances of categories and levels when required
      clubStr = getClubParse(trList[i]);   // club will always contain something prior to team
      newTeam = getTeamParse(trList[i]);   // will always be a new team... constructor is inside function getTeamParse
      newClub = findClub(clubStr, clubList, catStr, lvlStr);   // assign club
      newClub.Categories[findCategoryIndex(newClub.currentCategory.category, newClub.Categories)].Levels[findLevelIndex(newClub.currentCategory.currentLevel.level, newClub.Categories[findCategoryIndex(newClub.currentCategory.category, newClub.Categories)].Levels)].Teams.push(newTeam);
      if (clubList.length == 0) {
        clubList.push(newClub);
      } else {
        angular.forEach(clubList, function(club){
          if(club.name == newClub.name) {
            foundClub = true;
          }
        });
        if (!foundClub) {
          clubList.push(newClub);
        }
      }
    }
  }
  return clubList;
}

function parseInitial(htmlStr) {
  var str = htmlStr.slice(htmlStr.indexOf('id=\"m_pc_cbEquipes\">') +20, htmlStr.length);
  var str2 = str.slice(str.indexOf('<option value'), str.indexOf('</select>'));
  var retStr = str2.split('<option value=\"');
  retStr.splice(retStr.length -1, 1); // remove last element in list which is option 0
  retStr.splice(0,1); // remove first element in list which is an empty string
  
  return retStr;
}

function getTeamParse(str) {
  str.slice(1, str.indexOf('</'));
  var id = str.slice(0, str.indexOf('\"'));
  var name = str.slice(str.indexOf('>') +1, str.indexOf('</'));
  name = convertHTML(name);
  var team = new dmTeam(id, name);
  return team;
}

function getClubParse(str) {
  str.slice(1, str.indexOf('</'));
  var name = str.slice(str.indexOf('>') +1, str.indexOf('</'));
  if (name.lastIndexOf('-') == name.length -2) { // verify and remove hiphen at end of string
    name = name.substring(0, name.length -2);
  } else { 
    if(name.indexOf("-F&#233;m") != -1) {
      name = name.substring(0, name.indexOf("-F&#233;m"));
    }
  }
  name = convertHTML(name);
  return name;
}

// This function gets the category
function getCategoryParse(trs) {
  var temp = trs.split('>');
  return temp[1].slice(0, temp[1].indexOf(' '));
}

function getLevelParse(trs) {
  var temp = trs.split('>');
  var temp2 = temp[1].slice(0, temp[1].indexOf('<')).split(" ");
  return temp2[1];
}

function findCategoryIndex(str, col) {
  var returnVal;
  var found = false;
  
  if (col.length > 0) {
    for(var i =0; i< col.length; i++) {
      if (str == col[i].category) {
        found = true;
        returnVal = i;
      }
    }
    if (!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function findCategory(str, col, lvl) {
  var returnVal;
  var found = false;
  var numArgs = arguments.length;
  
  if (col.length > 0) {
    angular.forEach(col, function(category) {
      if (str == category.category) {
        found = true;
        if(numArgs ==3) { 
          category.Levels.push(lvl);
        }
        returnVal = category;
      }
    });
    if (!found && numArgs == 2) {
      returnVal = false;
    }
  } else {
    if(numArgs ==3) {
      var retCat = new dmCategory(str);
      retCat.Levels.push(lvl);
      returnVal = retCat;
    } else { 
      returnVal = false;
    }
  }
  return returnVal;
}

function findClub(str, col, cat, lvl) { // find club in col of clubs
// str: string to search
// col: collection to search through
// cat: string for category
// lvl: string for level
  var returnVal;
  var foundClub = false;
  var foundCat = false;
  var foundLvl = false;
  var retClub = null;
  
  if (col.length > 0) {
    angular.forEach(col, function(club) {
      if (str == club.name) {
        foundClub = true;
        angular.forEach(club.Categories, function(category){
          if(category.category == cat) {
            foundCat = true;
            //club.currentCategory = club.Categories[findCategoryIndex(cat, club.Categories)];
            angular.forEach(category.Levels, function(level){
              if(level.level == lvl) {
                foundLvl = true;
                //club.Categories[findCategoryIndex(cat, club.Categories)].currentLevel = club.Categories[findCategoryIndex(cat, club.Categories)].Levels[findLevelIndex(lvl, club.Categories[findCategoryIndex(cat, club.Categories)].Levels)];
                
              }
            });
          }
        });
        if (!foundCat) {    // new category - create a new instance
          var newCat = new dmCategory(cat);
          club.Categories.push(newCat);
          club.currentCategory = club.Categories[findCategoryIndex(cat, club.Categories)];
        }
        if (!foundLvl) {    // new level - create a new instance
          var newlvl = new dmLevel(lvl);
          club.Categories[findCategoryIndex(cat, club.Categories)].Levels.push(newlvl);
          club.Categories[findCategoryIndex(cat, club.Categories)].currentLevel = club.Categories[findCategoryIndex(cat, club.Categories)].Levels[findLevelIndex(lvl, club.Categories[findCategoryIndex(cat, club.Categories)].Levels)];
        }
        returnVal = club;
      }
    });
  } else {
    foundClub = false;
  }
  if(!foundClub){
    var nLvl = new dmLevel(lvl);
    var nCat = new dmCategory(cat);
    nCat.Levels.push(nLvl);
    nCat.currentLevel = findLevel(nLvl.level, nCat.Levels);
    retClub = new dmClub(str);
    retClub.Categories.push(nCat);
    retClub.currentCategory = findCategory(nCat.category, retClub.Categories);
    returnVal = retClub;
  }
  return returnVal;
}

function findTeam(str, col) { // find team in collection of teams by using id
  var returnVal;
  var found = false;
  
  if(col.length > 0) {
    angular.forEach(col, function(team) {
      if(str == team.id) {
        returnVal = team;
        found = true;
      }
    });
    if(!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function findLevelIndex(str, col) {
  var returnVal;
  var found = false;
  
  if(col.length > 0) {
    for(var i =0; i<col.length; i++) {
      if(str == col[i].level) {
        returnVal = i;
        found = true;
      }
    }
    if (!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function findLevel(str, col) {
  var returnVal;
  var found = false;
  
  if(col.length > 0) {
    angular.forEach(col, function(level) {
      if(str == level.level) {
        returnVal = level;
        found = true;
      }
    });
    if (!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function getViewState(htmlStr) {
  var str = htmlStr.slice(htmlStr.indexOf('__VIEWSTATE\" v')+20, htmlStr.length);
  var vst = str.slice(0, str.indexOf('/>')-2);
  return vst;
}

function constructGameModel(htmlstr, hTeam) { // will fill in the model with the corresponding games for the teams
  var returnCollectionDates = [];
  var ctrlId = null;
  var ctrlValue = null;
  var currentDate = null;
  var tdCollection = [];
  var tmpTime=null;
  var tmpArena=null;
  var tmpAdversary=null;
  var tmpCity=null;
  var tmpIsHomeGame=null;
  var tmpEvent = null;
  var tmpLocation = null;
  var tmpID = null;
  var foundLocation = false;
  var gVisitor = null;
  var gLocal = null;
  var dtNow = new Date();
  dtNow = Date.now();
  
  var str = htmlstr.slice(htmlstr.indexOf("<section id=\"m_pc_sctCedule\""), htmlstr.length);
  str = str.slice(str.indexOf("<table"), str.lastIndexOf("</table>"));
  var trCollection = str.split("<tr>");

  angular.forEach(trCollection, function(trStr){ // new game entry
    if(trStr.indexOf("lblCode") != -1) {
      tdCollection = trStr.split("<td");
      
      angular.forEach(tdCollection, function(lineStr){
        lineStr = lineStr.substring(lineStr.indexOf("<span"), lineStr.indexOf("</span>"));
        if(lineStr.length > 0) {
          ctrlId = lineStr.substring(lineStr.lastIndexOf("_") +1, lineStr.lastIndexOf("\""));
          ctrlValue = lineStr.substring(lineStr.indexOf("\">") +2, lineStr.length);
          
          switch (ctrlId) {
            case 'lblID':
                tmpID = ctrlValue;
              break;
            case 'lblDate':
                if(isNewDate(ctrlValue, returnCollectionDates)) {
                  // add date to collection
                  // convert string to Date
                  var dateItems = ctrlValue.split('/');
                  var yr = parseInt(dateItems[2]);
                  var mn = parseInt(dateItems[1]) - 1;
                  var dy = parseInt(dateItems[0]);
                  currentDate = new dmDate(new Date(yr, mn, dy));
                  if (currentDate.date < dtNow) {
                    currentDate.isPassed = true;
                  }
                  
                } else {
                  currentDate = findDate(ctrlValue, returnCollectionDates);
                }
              break;
            case 'lblTime': // assuming this is always going to be unique so save in date
                tmpTime = ctrlValue;
              break;  
            case 'lblVisitor': // assuming this is always going to be unique so save in date
                if(convertHTML(ctrlValue) != hTeam) { // visitor team is adversary, so local game
                  tmpAdversary = convertHTML(ctrlValue);
                  tmpIsHomeGame = true;
                }
              break;
            case 'lblLocal': // assuming this is always going to be unique so save in date
                processed = true;
                if(convertHTML(ctrlValue) != hTeam) { // visitor team is local, so NOT local game
                  tmpAdversary = convertHTML(ctrlValue);
                  tmpIsHomeGame = false;
                }
              break;
            case 'lblArena': // assuming this is always going to be unique so save in date
                tmpCity = convertHTML(ctrlValue.substring(0, ctrlValue.indexOf(":")));
                tmpArena = convertHTML(ctrlValue.substring(ctrlValue.indexOf(":")+2, ctrlValue.length));
              break;
            case 'lblButVisitor':
                gVisitor = ctrlValue;
              break;
            case 'lblButLocal':
                gLocal = ctrlValue;
            default:
              // code
            }
          }
        });
        if(returnCollectionDates.length == 0) {
          tmpLocation = new dmLocation(tmpArena, 0, tmpCity, null, null);
          
          if(tmpIsHomeGame) {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gLocal, gVisitor);
          } else {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gVisitor, gLocal);
          }
          
          currentDate.Events.push(tmpEvent);
        } else {
          angular.forEach(returnCollectionDates, function(date){
            angular.forEach(currentDate.Events, function(event){
              if(event.Location.arena == tmpArena) {
                foundLocation = true;
                tmpLocation = event.Location;
              }
            });
          });
          if(!foundLocation) {
            tmpLocation = new dmLocation(tmpArena, 0, tmpCity, null, null);
          }
          if(tmpIsHomeGame) {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gLocal, gVisitor);
          } else {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gVisitor, gLocal);
          }
          currentDate.Events.push(tmpEvent);
        }
        returnCollectionDates.push(currentDate);
    }
  });
  var t = 1;
  return returnCollectionDates;
}

function isNewDate(date, col) {
  // return bool value , found or mot
   var newDate = true;
   
   if(col.length !=0){
     angular.forEach(col, function(dd){
       if(dd.date == date) {
         newDate = false;
       }
     });
   }
  return newDate;
}

function findDate(date, col) {
  // return bool value , found or mot
   var retDate = null;
   
   if(col.length !=0){
     angular.forEach(col, function(dd){
       if(dd.date == date) {
         retDate = dd;
       }
     });
   }
  return retDate;
}

/* ==============================================

Calendar fuctions

================================================*/

function getStartDate(date, time) {
  var dateItems = date.split('/');
  var timeItems = time.split(':');
  var yr = parseInt(dateItems[2]);
  var mn = parseInt(dateItems[1]) - 1;
  var dy = parseInt(dateItems[0]);
  var hr = parseInt(timeItems[0]);
  var mi = parseInt(timeItems[1]);
  return new Date(yr, mn, dy, hr, mi, 0,0,0);
}

function getEndDate(date, minutes) {
  // date: Date - corresponds to the startdate of the event
  return new Date(date + minutes*60000);
}

/* ==============================================

Various fuctions

================================================*/

function sortIt(lvls, ord) {    // receiving a collection
  var indexFilled = 0;
  angular.forEach(ord, function(ordItem) {
    if (lvls.indexOf(ordItem) != -1) {
      lvls.move(lvls.indexOf(ordItem), indexFilled);
      indexFilled++;
    }
  })
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.slice(new_index, 0, this.slice(old_index, 1)[0]);
};

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

Date.prototype.addMinutes= function(h){
    this.setMinutes(this.getMinutes()+h);
    return this;
}

function convertHTML(str) {
  var returnVal = null;
  var tempStr = str.substr(str.indexOf("&"), 6);
  switch (tempStr) {
    case '&#201;':
      returnVal = str.replace(tempStr,"É");
      break;
    case '&#233;':
      returnVal = str.replace(tempStr,"é");
      break;
    default:
      returnVal = str;
  }
  return returnVal;
}