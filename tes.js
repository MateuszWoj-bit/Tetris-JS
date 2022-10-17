(window.webpackJsonp = window.webpackJsonp || []).push([
  ["js/calc_scripts", "js/calc_validation"],
  {
    "/ky/": function (e, t, a) {
      var i, n, o, r;
      function s(e) {
        return (s =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      !(function () {
        "use strict";
        var e, t, a, i, n;
        (e = function (e, t) {
          return (
            "string" == typeof e &&
            "string" == typeof t &&
            e.toLowerCase() === t.toLowerCase()
          );
        }),
          (t = function (e, a, i) {
            var n = i || "0",
              o = e.toString();
            return o.length < a ? t(n + o, a) : o;
          }),
          (a = function (e) {
            var t, i;
            for (e = e || {}, t = 1; t < arguments.length; t++)
              if ((i = arguments[t]))
                for (var n in i)
                  i.hasOwnProperty(n) &&
                    ("object" == s(i[n]) ? a(e[n], i[n]) : (e[n] = i[n]));
            return e;
          }),
          (i = function (e, t) {
            for (var a = 0; a < t.length; a++)
              if (t[a].toLowerCase() === e.toLowerCase()) return a;
            return -1;
          }),
          (n = {
            dateSettings: {
              days: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              monthsShort: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              meridiem: ["AM", "PM"],
              ordinal: function (e) {
                var t = e % 10,
                  a = { 1: "st", 2: "nd", 3: "rd" };
                return 1 !== Math.floor((e % 100) / 10) && a[t] ? a[t] : "th";
              },
            },
            separators: /[ \-+\/\.T:@]/g,
            validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
            intParts: /[djwNzmnyYhHgGis]/g,
            tzParts:
              /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            tzClip: /[^-+\dA-Z]/g,
          }),
          ((r = function (e) {
            var t = this,
              i = a(n, e);
            (t.dateSettings = i.dateSettings),
              (t.separators = i.separators),
              (t.validParts = i.validParts),
              (t.intParts = i.intParts),
              (t.tzParts = i.tzParts),
              (t.tzClip = i.tzClip);
          }).prototype = {
            constructor: r,
            getMonth: function (e) {
              var t;
              return (
                0 === (t = i(e, this.dateSettings.monthsShort) + 1) &&
                  (t = i(e, this.dateSettings.months) + 1),
                t
              );
            },
            parseDate: function (t, a) {
              var i,
                n,
                o,
                r,
                d,
                l,
                u,
                h,
                c,
                f,
                m = this,
                p = !1,
                g = !1,
                v = m.dateSettings,
                y = {
                  date: null,
                  year: null,
                  month: null,
                  day: null,
                  hour: 0,
                  min: 0,
                  sec: 0,
                };
              if (!t) return null;
              if (t instanceof Date) return t;
              if ("U" === a) return (o = parseInt(t)) ? new Date(1e3 * o) : t;
              switch (s(t)) {
                case "number":
                  return new Date(t);
                case "string":
                  break;
                default:
                  return null;
              }
              if (!(i = a.match(m.validParts)) || 0 === i.length)
                throw new Error("Invalid date format definition.");
              for (
                n = t.replace(m.separators, "\0").split("\0"), o = 0;
                o < n.length;
                o++
              )
                switch (((r = n[o]), (d = parseInt(r)), i[o])) {
                  case "y":
                  case "Y":
                    if (!d) return null;
                    (c = r.length),
                      (y.year =
                        2 === c ? parseInt((70 > d ? "20" : "19") + r) : d),
                      (p = !0);
                    break;
                  case "m":
                  case "n":
                  case "M":
                  case "F":
                    if (isNaN(d)) {
                      if (!((l = m.getMonth(r)) > 0)) return null;
                      y.month = l;
                    } else {
                      if (!(d >= 1 && 12 >= d)) return null;
                      y.month = d;
                    }
                    p = !0;
                    break;
                  case "d":
                  case "j":
                    if (!(d >= 1 && 31 >= d)) return null;
                    (y.day = d), (p = !0);
                    break;
                  case "g":
                  case "h":
                    if (
                      ((f =
                        n[
                          (u =
                            i.indexOf("a") > -1
                              ? i.indexOf("a")
                              : i.indexOf("A") > -1
                              ? i.indexOf("A")
                              : -1)
                        ]),
                      u > -1)
                    )
                      (h = e(f, v.meridiem[0])
                        ? 0
                        : e(f, v.meridiem[1])
                        ? 12
                        : -1),
                        d >= 1 && 12 >= d && h > -1
                          ? (y.hour = d + h - 1)
                          : d >= 0 && 23 >= d && (y.hour = d);
                    else {
                      if (!(d >= 0 && 23 >= d)) return null;
                      y.hour = d;
                    }
                    g = !0;
                    break;
                  case "G":
                  case "H":
                    if (!(d >= 0 && 23 >= d)) return null;
                    (y.hour = d), (g = !0);
                    break;
                  case "i":
                    if (!(d >= 0 && 59 >= d)) return null;
                    (y.min = d), (g = !0);
                    break;
                  case "s":
                    if (!(d >= 0 && 59 >= d)) return null;
                    (y.sec = d), (g = !0);
                }
              if (!0 === p && y.year && y.month && y.day)
                y.date = new Date(
                  y.year,
                  y.month - 1,
                  y.day,
                  y.hour,
                  y.min,
                  y.sec,
                  0
                );
              else {
                if (!0 !== g) return null;
                y.date = new Date(0, 0, 0, y.hour, y.min, y.sec, 0);
              }
              return y.date;
            },
            guessDate: function (e, t) {
              if ("string" != typeof e) return e;
              var a,
                i,
                n,
                o,
                r,
                s,
                d = e.replace(this.separators, "\0").split("\0"),
                l = t.match(this.validParts),
                u = new Date(),
                h = 0;
              if (!/^[djmn]/g.test(l[0])) return e;
              for (n = 0; n < d.length; n++) {
                if (
                  ((h = 2),
                  (r = d[n]),
                  (s = parseInt(r.substr(0, 2))),
                  isNaN(s))
                )
                  return null;
                switch (n) {
                  case 0:
                    "m" === l[0] || "n" === l[0]
                      ? u.setMonth(s - 1)
                      : u.setDate(s);
                    break;
                  case 1:
                    "m" === l[0] || "n" === l[0]
                      ? u.setDate(s)
                      : u.setMonth(s - 1);
                    break;
                  case 2:
                    if (
                      ((i = u.getFullYear()),
                      (h = 4 > (a = r.length) ? a : 4),
                      !(i = parseInt(
                        4 > a
                          ? i.toString().substr(0, 4 - a) + r
                          : r.substr(0, 4)
                      )))
                    )
                      return null;
                    u.setFullYear(i);
                    break;
                  case 3:
                    u.setHours(s);
                    break;
                  case 4:
                    u.setMinutes(s);
                    break;
                  case 5:
                    u.setSeconds(s);
                }
                (o = r.substr(h)).length > 0 && d.splice(n + 1, 0, o);
              }
              return u;
            },
            parseFormat: function (e, a) {
              var i,
                n = this,
                o = n.dateSettings,
                r = /\\?(.?)/gi,
                s = function (e, t) {
                  return i[e] ? i[e]() : t;
                };
              return (
                (i = {
                  d: function () {
                    return t(i.j(), 2);
                  },
                  D: function () {
                    return o.daysShort[i.w()];
                  },
                  j: function () {
                    return a.getDate();
                  },
                  l: function () {
                    return o.days[i.w()];
                  },
                  N: function () {
                    return i.w() || 7;
                  },
                  w: function () {
                    return a.getDay();
                  },
                  z: function () {
                    var e = new Date(i.Y(), i.n() - 1, i.j()),
                      t = new Date(i.Y(), 0, 1);
                    return Math.round((e - t) / 864e5);
                  },
                  W: function () {
                    var e = new Date(i.Y(), i.n() - 1, i.j() - i.N() + 3),
                      a = new Date(e.getFullYear(), 0, 4);
                    return t(1 + Math.round((e - a) / 864e5 / 7), 2);
                  },
                  F: function () {
                    return o.months[a.getMonth()];
                  },
                  m: function () {
                    return t(i.n(), 2);
                  },
                  M: function () {
                    return o.monthsShort[a.getMonth()];
                  },
                  n: function () {
                    return a.getMonth() + 1;
                  },
                  t: function () {
                    return new Date(i.Y(), i.n(), 0).getDate();
                  },
                  L: function () {
                    var e = i.Y();
                    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0 ? 1 : 0;
                  },
                  o: function () {
                    var e = i.n(),
                      t = i.W();
                    return (
                      i.Y() +
                      (12 === e && 9 > t ? 1 : 1 === e && t > 9 ? -1 : 0)
                    );
                  },
                  Y: function () {
                    return a.getFullYear();
                  },
                  y: function () {
                    return i.Y().toString().slice(-2);
                  },
                  a: function () {
                    return i.A().toLowerCase();
                  },
                  A: function () {
                    var e = i.G() < 12 ? 0 : 1;
                    return o.meridiem[e];
                  },
                  B: function () {
                    var e = 3600 * a.getUTCHours(),
                      i = 60 * a.getUTCMinutes(),
                      n = a.getUTCSeconds();
                    return t(Math.floor((e + i + n + 3600) / 86.4) % 1e3, 3);
                  },
                  g: function () {
                    return i.G() % 12 || 12;
                  },
                  G: function () {
                    return a.getHours();
                  },
                  h: function () {
                    return t(i.g(), 2);
                  },
                  H: function () {
                    return t(i.G(), 2);
                  },
                  i: function () {
                    return t(a.getMinutes(), 2);
                  },
                  s: function () {
                    return t(a.getSeconds(), 2);
                  },
                  u: function () {
                    return t(1e3 * a.getMilliseconds(), 6);
                  },
                  e: function () {
                    return (
                      /\((.*)\)/.exec(String(a))[1] ||
                      "Coordinated Universal Time"
                    );
                  },
                  I: function () {
                    return new Date(i.Y(), 0) - Date.UTC(i.Y(), 0) !=
                      new Date(i.Y(), 6) - Date.UTC(i.Y(), 6)
                      ? 1
                      : 0;
                  },
                  O: function () {
                    var e = a.getTimezoneOffset(),
                      i = Math.abs(e);
                    return (
                      (e > 0 ? "-" : "+") +
                      t(100 * Math.floor(i / 60) + (i % 60), 4)
                    );
                  },
                  P: function () {
                    var e = i.O();
                    return e.substr(0, 3) + ":" + e.substr(3, 2);
                  },
                  T: function () {
                    return (
                      (String(a).match(n.tzParts) || [""])
                        .pop()
                        .replace(n.tzClip, "") || "UTC"
                    );
                  },
                  Z: function () {
                    return 60 * -a.getTimezoneOffset();
                  },
                  c: function () {
                    return "Y-m-d\\TH:i:sP".replace(r, s);
                  },
                  r: function () {
                    return "D, d M Y H:i:s O".replace(r, s);
                  },
                  U: function () {
                    return a.getTime() / 1e3 || 0;
                  },
                }),
                s(e, e)
              );
            },
            formatDate: function (e, t) {
              var a,
                i,
                n,
                o,
                r,
                s = this,
                d = "";
              if ("string" == typeof e && !(e = s.parseDate(e, t))) return null;
              if (e instanceof Date) {
                for (n = t.length, a = 0; n > a; a++)
                  "S" !== (r = t.charAt(a)) &&
                    "\\" !== r &&
                    (a > 0 && "\\" === t.charAt(a - 1)
                      ? (d += r)
                      : ((o = s.parseFormat(r, e)),
                        a !== n - 1 &&
                          s.intParts.test(r) &&
                          "S" === t.charAt(a + 1) &&
                          ((i = parseInt(o) || 0),
                          (o += s.dateSettings.ordinal(i))),
                        (d += o)));
                return d;
              }
              return "";
            },
          });
      })();
      var d;
      (d = function (e) {
        "use strict";
        function t(e, t, a) {
          (this.date = e), (this.desc = t), (this.style = a);
        }
        var a = {
            i18n: {
              ar: {
                months: [
                  "كانون الثاني",
                  "شباط",
                  "آذار",
                  "نيسان",
                  "مايو",
                  "حزيران",
                  "تموز",
                  "آب",
                  "أيلول",
                  "تشرين الأول",
                  "تشرين الثاني",
                  "كانون الأول",
                ],
                dayOfWeekShort: ["ن", "ث", "ع", "خ", "ج", "س", "ح"],
                dayOfWeek: [
                  "الأحد",
                  "الاثنين",
                  "الثلاثاء",
                  "الأربعاء",
                  "الخميس",
                  "الجمعة",
                  "السبت",
                  "الأحد",
                ],
              },
              ro: {
                months: [
                  "Ianuarie",
                  "Februarie",
                  "Martie",
                  "Aprilie",
                  "Mai",
                  "Iunie",
                  "Iulie",
                  "August",
                  "Septembrie",
                  "Octombrie",
                  "Noiembrie",
                  "Decembrie",
                ],
                dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
                dayOfWeek: [
                  "Duminică",
                  "Luni",
                  "Marţi",
                  "Miercuri",
                  "Joi",
                  "Vineri",
                  "Sâmbătă",
                ],
              },
              id: {
                months: [
                  "Januari",
                  "Februari",
                  "Maret",
                  "April",
                  "Mei",
                  "Juni",
                  "Juli",
                  "Agustus",
                  "September",
                  "Oktober",
                  "November",
                  "Desember",
                ],
                dayOfWeekShort: [
                  "Min",
                  "Sen",
                  "Sel",
                  "Rab",
                  "Kam",
                  "Jum",
                  "Sab",
                ],
                dayOfWeek: [
                  "Minggu",
                  "Senin",
                  "Selasa",
                  "Rabu",
                  "Kamis",
                  "Jumat",
                  "Sabtu",
                ],
              },
              is: {
                months: [
                  "Janúar",
                  "Febrúar",
                  "Mars",
                  "Apríl",
                  "Maí",
                  "Júní",
                  "Júlí",
                  "Ágúst",
                  "September",
                  "Október",
                  "Nóvember",
                  "Desember",
                ],
                dayOfWeekShort: [
                  "Sun",
                  "Mán",
                  "Þrið",
                  "Mið",
                  "Fim",
                  "Fös",
                  "Lau",
                ],
                dayOfWeek: [
                  "Sunnudagur",
                  "Mánudagur",
                  "Þriðjudagur",
                  "Miðvikudagur",
                  "Fimmtudagur",
                  "Föstudagur",
                  "Laugardagur",
                ],
              },
              bg: {
                months: [
                  "Януари",
                  "Февруари",
                  "Март",
                  "Април",
                  "Май",
                  "Юни",
                  "Юли",
                  "Август",
                  "Септември",
                  "Октомври",
                  "Ноември",
                  "Декември",
                ],
                dayOfWeekShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                dayOfWeek: [
                  "Неделя",
                  "Понеделник",
                  "Вторник",
                  "Сряда",
                  "Четвъртък",
                  "Петък",
                  "Събота",
                ],
              },
              fa: {
                months: [
                  "فروردین",
                  "اردیبهشت",
                  "خرداد",
                  "تیر",
                  "مرداد",
                  "شهریور",
                  "مهر",
                  "آبان",
                  "آذر",
                  "دی",
                  "بهمن",
                  "اسفند",
                ],
                dayOfWeekShort: [
                  "یکشنبه",
                  "دوشنبه",
                  "سه شنبه",
                  "چهارشنبه",
                  "پنجشنبه",
                  "جمعه",
                  "شنبه",
                ],
                dayOfWeek: [
                  "یک‌شنبه",
                  "دوشنبه",
                  "سه‌شنبه",
                  "چهارشنبه",
                  "پنج‌شنبه",
                  "جمعه",
                  "شنبه",
                  "یک‌شنبه",
                ],
              },
              ru: {
                months: [
                  "Январь",
                  "Февраль",
                  "Март",
                  "Апрель",
                  "Май",
                  "Июнь",
                  "Июль",
                  "Август",
                  "Сентябрь",
                  "Октябрь",
                  "Ноябрь",
                  "Декабрь",
                ],
                dayOfWeekShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                dayOfWeek: [
                  "Воскресенье",
                  "Понедельник",
                  "Вторник",
                  "Среда",
                  "Четверг",
                  "Пятница",
                  "Суббота",
                ],
              },
              uk: {
                months: [
                  "Січень",
                  "Лютий",
                  "Березень",
                  "Квітень",
                  "Травень",
                  "Червень",
                  "Липень",
                  "Серпень",
                  "Вересень",
                  "Жовтень",
                  "Листопад",
                  "Грудень",
                ],
                dayOfWeekShort: [
                  "Ндл",
                  "Пнд",
                  "Втр",
                  "Срд",
                  "Чтв",
                  "Птн",
                  "Сбт",
                ],
                dayOfWeek: [
                  "Неділя",
                  "Понеділок",
                  "Вівторок",
                  "Середа",
                  "Четвер",
                  "П'ятниця",
                  "Субота",
                ],
              },
              en: {
                months: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                dayOfWeekShort: [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ],
                dayOfWeek: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              },
              el: {
                months: [
                  "Ιανουάριος",
                  "Φεβρουάριος",
                  "Μάρτιος",
                  "Απρίλιος",
                  "Μάιος",
                  "Ιούνιος",
                  "Ιούλιος",
                  "Αύγουστος",
                  "Σεπτέμβριος",
                  "Οκτώβριος",
                  "Νοέμβριος",
                  "Δεκέμβριος",
                ],
                dayOfWeekShort: [
                  "Κυρ",
                  "Δευ",
                  "Τρι",
                  "Τετ",
                  "Πεμ",
                  "Παρ",
                  "Σαβ",
                ],
                dayOfWeek: [
                  "Κυριακή",
                  "Δευτέρα",
                  "Τρίτη",
                  "Τετάρτη",
                  "Πέμπτη",
                  "Παρασκευή",
                  "Σάββατο",
                ],
              },
              de: {
                months: [
                  "Januar",
                  "Februar",
                  "März",
                  "April",
                  "Mai",
                  "Juni",
                  "Juli",
                  "August",
                  "September",
                  "Oktober",
                  "November",
                  "Dezember",
                ],
                dayOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                dayOfWeek: [
                  "Sonntag",
                  "Montag",
                  "Dienstag",
                  "Mittwoch",
                  "Donnerstag",
                  "Freitag",
                  "Samstag",
                ],
              },
              nl: {
                months: [
                  "januari",
                  "februari",
                  "maart",
                  "april",
                  "mei",
                  "juni",
                  "juli",
                  "augustus",
                  "september",
                  "oktober",
                  "november",
                  "december",
                ],
                dayOfWeekShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                dayOfWeek: [
                  "zondag",
                  "maandag",
                  "dinsdag",
                  "woensdag",
                  "donderdag",
                  "vrijdag",
                  "zaterdag",
                ],
              },
              tr: {
                months: [
                  "Ocak",
                  "Şubat",
                  "Mart",
                  "Nisan",
                  "Mayıs",
                  "Haziran",
                  "Temmuz",
                  "Ağustos",
                  "Eylül",
                  "Ekim",
                  "Kasım",
                  "Aralık",
                ],
                dayOfWeekShort: [
                  "Paz",
                  "Pts",
                  "Sal",
                  "Çar",
                  "Per",
                  "Cum",
                  "Cts",
                ],
                dayOfWeek: [
                  "Pazar",
                  "Pazartesi",
                  "Salı",
                  "Çarşamba",
                  "Perşembe",
                  "Cuma",
                  "Cumartesi",
                ],
              },
              fr: {
                months: [
                  "Janvier",
                  "Février",
                  "Mars",
                  "Avril",
                  "Mai",
                  "Juin",
                  "Juillet",
                  "Août",
                  "Septembre",
                  "Octobre",
                  "Novembre",
                  "Décembre",
                ],
                dayOfWeekShort: [
                  "Dim",
                  "Lun",
                  "Mar",
                  "Mer",
                  "Jeu",
                  "Ven",
                  "Sam",
                ],
                dayOfWeek: [
                  "dimanche",
                  "lundi",
                  "mardi",
                  "mercredi",
                  "jeudi",
                  "vendredi",
                  "samedi",
                ],
              },
              es: {
                months: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ],
                dayOfWeekShort: [
                  "Dom",
                  "Lun",
                  "Mar",
                  "Mié",
                  "Jue",
                  "Vie",
                  "Sáb",
                ],
                dayOfWeek: [
                  "Domingo",
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                ],
              },
              th: {
                months: [
                  "มกราคม",
                  "กุมภาพันธ์",
                  "มีนาคม",
                  "เมษายน",
                  "พฤษภาคม",
                  "มิถุนายน",
                  "กรกฎาคม",
                  "สิงหาคม",
                  "กันยายน",
                  "ตุลาคม",
                  "พฤศจิกายน",
                  "ธันวาคม",
                ],
                dayOfWeekShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
                dayOfWeek: [
                  "อาทิตย์",
                  "จันทร์",
                  "อังคาร",
                  "พุธ",
                  "พฤหัส",
                  "ศุกร์",
                  "เสาร์",
                  "อาทิตย์",
                ],
              },
              pl: {
                months: [
                  "styczeń",
                  "luty",
                  "marzec",
                  "kwiecień",
                  "maj",
                  "czerwiec",
                  "lipiec",
                  "sierpień",
                  "wrzesień",
                  "październik",
                  "listopad",
                  "grudzień",
                ],
                dayOfWeekShort: ["nd", "pn", "wt", "śr", "cz", "pt", "sb"],
                dayOfWeek: [
                  "niedziela",
                  "poniedziałek",
                  "wtorek",
                  "środa",
                  "czwartek",
                  "piątek",
                  "sobota",
                ],
              },
              pt: {
                months: [
                  "Janeiro",
                  "Fevereiro",
                  "Março",
                  "Abril",
                  "Maio",
                  "Junho",
                  "Julho",
                  "Agosto",
                  "Setembro",
                  "Outubro",
                  "Novembro",
                  "Dezembro",
                ],
                dayOfWeekShort: [
                  "Dom",
                  "Seg",
                  "Ter",
                  "Qua",
                  "Qui",
                  "Sex",
                  "Sab",
                ],
                dayOfWeek: [
                  "Domingo",
                  "Segunda",
                  "Terça",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sábado",
                ],
              },
              ch: {
                months: [
                  "一月",
                  "二月",
                  "三月",
                  "四月",
                  "五月",
                  "六月",
                  "七月",
                  "八月",
                  "九月",
                  "十月",
                  "十一月",
                  "十二月",
                ],
                dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
              },
              se: {
                months: [
                  "Januari",
                  "Februari",
                  "Mars",
                  "April",
                  "Maj",
                  "Juni",
                  "Juli",
                  "Augusti",
                  "September",
                  "Oktober",
                  "November",
                  "December",
                ],
                dayOfWeekShort: [
                  "Sön",
                  "Mån",
                  "Tis",
                  "Ons",
                  "Tor",
                  "Fre",
                  "Lör",
                ],
              },
              km: {
                months: [
                  "មករា​",
                  "កុម្ភៈ",
                  "មិនា​",
                  "មេសា​",
                  "ឧសភា​",
                  "មិថុនា​",
                  "កក្កដា​",
                  "សីហា​",
                  "កញ្ញា​",
                  "តុលា​",
                  "វិច្ឆិកា",
                  "ធ្នូ​",
                ],
                dayOfWeekShort: [
                  "អាទិ​",
                  "ច័ន្ទ​",
                  "អង្គារ​",
                  "ពុធ​",
                  "ព្រហ​​",
                  "សុក្រ​",
                  "សៅរ៍",
                ],
                dayOfWeek: [
                  "អាទិត្យ​",
                  "ច័ន្ទ​",
                  "អង្គារ​",
                  "ពុធ​",
                  "ព្រហស្បតិ៍​",
                  "សុក្រ​",
                  "សៅរ៍",
                ],
              },
              kr: {
                months: [
                  "1월",
                  "2월",
                  "3월",
                  "4월",
                  "5월",
                  "6월",
                  "7월",
                  "8월",
                  "9월",
                  "10월",
                  "11월",
                  "12월",
                ],
                dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                dayOfWeek: [
                  "일요일",
                  "월요일",
                  "화요일",
                  "수요일",
                  "목요일",
                  "금요일",
                  "토요일",
                ],
              },
              it: {
                months: [
                  "Gennaio",
                  "Febbraio",
                  "Marzo",
                  "Aprile",
                  "Maggio",
                  "Giugno",
                  "Luglio",
                  "Agosto",
                  "Settembre",
                  "Ottobre",
                  "Novembre",
                  "Dicembre",
                ],
                dayOfWeekShort: [
                  "Dom",
                  "Lun",
                  "Mar",
                  "Mer",
                  "Gio",
                  "Ven",
                  "Sab",
                ],
                dayOfWeek: [
                  "Domenica",
                  "Lunedì",
                  "Martedì",
                  "Mercoledì",
                  "Giovedì",
                  "Venerdì",
                  "Sabato",
                ],
              },
              da: {
                months: [
                  "Januar",
                  "Februar",
                  "Marts",
                  "April",
                  "Maj",
                  "Juni",
                  "Juli",
                  "August",
                  "September",
                  "Oktober",
                  "November",
                  "December",
                ],
                dayOfWeekShort: [
                  "Søn",
                  "Man",
                  "Tir",
                  "Ons",
                  "Tor",
                  "Fre",
                  "Lør",
                ],
                dayOfWeek: [
                  "søndag",
                  "mandag",
                  "tirsdag",
                  "onsdag",
                  "torsdag",
                  "fredag",
                  "lørdag",
                ],
              },
              no: {
                months: [
                  "Januar",
                  "Februar",
                  "Mars",
                  "April",
                  "Mai",
                  "Juni",
                  "Juli",
                  "August",
                  "September",
                  "Oktober",
                  "November",
                  "Desember",
                ],
                dayOfWeekShort: [
                  "Søn",
                  "Man",
                  "Tir",
                  "Ons",
                  "Tor",
                  "Fre",
                  "Lør",
                ],
                dayOfWeek: [
                  "Søndag",
                  "Mandag",
                  "Tirsdag",
                  "Onsdag",
                  "Torsdag",
                  "Fredag",
                  "Lørdag",
                ],
              },
              ja: {
                months: [
                  "1月",
                  "2月",
                  "3月",
                  "4月",
                  "5月",
                  "6月",
                  "7月",
                  "8月",
                  "9月",
                  "10月",
                  "11月",
                  "12月",
                ],
                dayOfWeekShort: ["日", "月", "火", "水", "木", "金", "土"],
                dayOfWeek: [
                  "日曜",
                  "月曜",
                  "火曜",
                  "水曜",
                  "木曜",
                  "金曜",
                  "土曜",
                ],
              },
              vi: {
                months: [
                  "Tháng 1",
                  "Tháng 2",
                  "Tháng 3",
                  "Tháng 4",
                  "Tháng 5",
                  "Tháng 6",
                  "Tháng 7",
                  "Tháng 8",
                  "Tháng 9",
                  "Tháng 10",
                  "Tháng 11",
                  "Tháng 12",
                ],
                dayOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                dayOfWeek: [
                  "Chủ nhật",
                  "Thứ hai",
                  "Thứ ba",
                  "Thứ tư",
                  "Thứ năm",
                  "Thứ sáu",
                  "Thứ bảy",
                ],
              },
              sl: {
                months: [
                  "Januar",
                  "Februar",
                  "Marec",
                  "April",
                  "Maj",
                  "Junij",
                  "Julij",
                  "Avgust",
                  "September",
                  "Oktober",
                  "November",
                  "December",
                ],
                dayOfWeekShort: [
                  "Ned",
                  "Pon",
                  "Tor",
                  "Sre",
                  "Čet",
                  "Pet",
                  "Sob",
                ],
                dayOfWeek: [
                  "Nedelja",
                  "Ponedeljek",
                  "Torek",
                  "Sreda",
                  "Četrtek",
                  "Petek",
                  "Sobota",
                ],
              },
              cs: {
                months: [
                  "Leden",
                  "Únor",
                  "Březen",
                  "Duben",
                  "Květen",
                  "Červen",
                  "Červenec",
                  "Srpen",
                  "Září",
                  "Říjen",
                  "Listopad",
                  "Prosinec",
                ],
                dayOfWeekShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
              },
              hu: {
                months: [
                  "Január",
                  "Február",
                  "Március",
                  "Április",
                  "Május",
                  "Június",
                  "Július",
                  "Augusztus",
                  "Szeptember",
                  "Október",
                  "November",
                  "December",
                ],
                dayOfWeekShort: ["Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
                dayOfWeek: [
                  "vasárnap",
                  "hétfő",
                  "kedd",
                  "szerda",
                  "csütörtök",
                  "péntek",
                  "szombat",
                ],
              },
              az: {
                months: [
                  "Yanvar",
                  "Fevral",
                  "Mart",
                  "Aprel",
                  "May",
                  "Iyun",
                  "Iyul",
                  "Avqust",
                  "Sentyabr",
                  "Oktyabr",
                  "Noyabr",
                  "Dekabr",
                ],
                dayOfWeekShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
                dayOfWeek: [
                  "Bazar",
                  "Bazar ertəsi",
                  "Çərşənbə axşamı",
                  "Çərşənbə",
                  "Cümə axşamı",
                  "Cümə",
                  "Şənbə",
                ],
              },
              bs: {
                months: [
                  "Januar",
                  "Februar",
                  "Mart",
                  "April",
                  "Maj",
                  "Jun",
                  "Jul",
                  "Avgust",
                  "Septembar",
                  "Oktobar",
                  "Novembar",
                  "Decembar",
                ],
                dayOfWeekShort: [
                  "Ned",
                  "Pon",
                  "Uto",
                  "Sri",
                  "Čet",
                  "Pet",
                  "Sub",
                ],
                dayOfWeek: [
                  "Nedjelja",
                  "Ponedjeljak",
                  "Utorak",
                  "Srijeda",
                  "Četvrtak",
                  "Petak",
                  "Subota",
                ],
              },
              ca: {
                months: [
                  "Gener",
                  "Febrer",
                  "Març",
                  "Abril",
                  "Maig",
                  "Juny",
                  "Juliol",
                  "Agost",
                  "Setembre",
                  "Octubre",
                  "Novembre",
                  "Desembre",
                ],
                dayOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
                dayOfWeek: [
                  "Diumenge",
                  "Dilluns",
                  "Dimarts",
                  "Dimecres",
                  "Dijous",
                  "Divendres",
                  "Dissabte",
                ],
              },
              "en-GB": {
                months: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                dayOfWeekShort: [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ],
                dayOfWeek: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              },
              et: {
                months: [
                  "Jaanuar",
                  "Veebruar",
                  "Märts",
                  "Aprill",
                  "Mai",
                  "Juuni",
                  "Juuli",
                  "August",
                  "September",
                  "Oktoober",
                  "November",
                  "Detsember",
                ],
                dayOfWeekShort: ["P", "E", "T", "K", "N", "R", "L"],
                dayOfWeek: [
                  "Pühapäev",
                  "Esmaspäev",
                  "Teisipäev",
                  "Kolmapäev",
                  "Neljapäev",
                  "Reede",
                  "Laupäev",
                ],
              },
              eu: {
                months: [
                  "Urtarrila",
                  "Otsaila",
                  "Martxoa",
                  "Apirila",
                  "Maiatza",
                  "Ekaina",
                  "Uztaila",
                  "Abuztua",
                  "Iraila",
                  "Urria",
                  "Azaroa",
                  "Abendua",
                ],
                dayOfWeekShort: [
                  "Ig.",
                  "Al.",
                  "Ar.",
                  "Az.",
                  "Og.",
                  "Or.",
                  "La.",
                ],
                dayOfWeek: [
                  "Igandea",
                  "Astelehena",
                  "Asteartea",
                  "Asteazkena",
                  "Osteguna",
                  "Ostirala",
                  "Larunbata",
                ],
              },
              fi: {
                months: [
                  "Tammikuu",
                  "Helmikuu",
                  "Maaliskuu",
                  "Huhtikuu",
                  "Toukokuu",
                  "Kesäkuu",
                  "Heinäkuu",
                  "Elokuu",
                  "Syyskuu",
                  "Lokakuu",
                  "Marraskuu",
                  "Joulukuu",
                ],
                dayOfWeekShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
                dayOfWeek: [
                  "sunnuntai",
                  "maanantai",
                  "tiistai",
                  "keskiviikko",
                  "torstai",
                  "perjantai",
                  "lauantai",
                ],
              },
              gl: {
                months: [
                  "Xan",
                  "Feb",
                  "Maz",
                  "Abr",
                  "Mai",
                  "Xun",
                  "Xul",
                  "Ago",
                  "Set",
                  "Out",
                  "Nov",
                  "Dec",
                ],
                dayOfWeekShort: [
                  "Dom",
                  "Lun",
                  "Mar",
                  "Mer",
                  "Xov",
                  "Ven",
                  "Sab",
                ],
                dayOfWeek: [
                  "Domingo",
                  "Luns",
                  "Martes",
                  "Mércores",
                  "Xoves",
                  "Venres",
                  "Sábado",
                ],
              },
              hr: {
                months: [
                  "Siječanj",
                  "Veljača",
                  "Ožujak",
                  "Travanj",
                  "Svibanj",
                  "Lipanj",
                  "Srpanj",
                  "Kolovoz",
                  "Rujan",
                  "Listopad",
                  "Studeni",
                  "Prosinac",
                ],
                dayOfWeekShort: [
                  "Ned",
                  "Pon",
                  "Uto",
                  "Sri",
                  "Čet",
                  "Pet",
                  "Sub",
                ],
                dayOfWeek: [
                  "Nedjelja",
                  "Ponedjeljak",
                  "Utorak",
                  "Srijeda",
                  "Četvrtak",
                  "Petak",
                  "Subota",
                ],
              },
              ko: {
                months: [
                  "1월",
                  "2월",
                  "3월",
                  "4월",
                  "5월",
                  "6월",
                  "7월",
                  "8월",
                  "9월",
                  "10월",
                  "11월",
                  "12월",
                ],
                dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                dayOfWeek: [
                  "일요일",
                  "월요일",
                  "화요일",
                  "수요일",
                  "목요일",
                  "금요일",
                  "토요일",
                ],
              },
              lt: {
                months: [
                  "Sausio",
                  "Vasario",
                  "Kovo",
                  "Balandžio",
                  "Gegužės",
                  "Birželio",
                  "Liepos",
                  "Rugpjūčio",
                  "Rugsėjo",
                  "Spalio",
                  "Lapkričio",
                  "Gruodžio",
                ],
                dayOfWeekShort: [
                  "Sek",
                  "Pir",
                  "Ant",
                  "Tre",
                  "Ket",
                  "Pen",
                  "Šeš",
                ],
                dayOfWeek: [
                  "Sekmadienis",
                  "Pirmadienis",
                  "Antradienis",
                  "Trečiadienis",
                  "Ketvirtadienis",
                  "Penktadienis",
                  "Šeštadienis",
                ],
              },
              lv: {
                months: [
                  "Janvāris",
                  "Februāris",
                  "Marts",
                  "Aprīlis ",
                  "Maijs",
                  "Jūnijs",
                  "Jūlijs",
                  "Augusts",
                  "Septembris",
                  "Oktobris",
                  "Novembris",
                  "Decembris",
                ],
                dayOfWeekShort: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"],
                dayOfWeek: [
                  "Svētdiena",
                  "Pirmdiena",
                  "Otrdiena",
                  "Trešdiena",
                  "Ceturtdiena",
                  "Piektdiena",
                  "Sestdiena",
                ],
              },
              mk: {
                months: [
                  "јануари",
                  "февруари",
                  "март",
                  "април",
                  "мај",
                  "јуни",
                  "јули",
                  "август",
                  "септември",
                  "октомври",
                  "ноември",
                  "декември",
                ],
                dayOfWeekShort: [
                  "нед",
                  "пон",
                  "вто",
                  "сре",
                  "чет",
                  "пет",
                  "саб",
                ],
                dayOfWeek: [
                  "Недела",
                  "Понеделник",
                  "Вторник",
                  "Среда",
                  "Четврток",
                  "Петок",
                  "Сабота",
                ],
              },
              mn: {
                months: [
                  "1-р сар",
                  "2-р сар",
                  "3-р сар",
                  "4-р сар",
                  "5-р сар",
                  "6-р сар",
                  "7-р сар",
                  "8-р сар",
                  "9-р сар",
                  "10-р сар",
                  "11-р сар",
                  "12-р сар",
                ],
                dayOfWeekShort: [
                  "Дав",
                  "Мяг",
                  "Лха",
                  "Пүр",
                  "Бсн",
                  "Бям",
                  "Ням",
                ],
                dayOfWeek: [
                  "Даваа",
                  "Мягмар",
                  "Лхагва",
                  "Пүрэв",
                  "Баасан",
                  "Бямба",
                  "Ням",
                ],
              },
              "pt-BR": {
                months: [
                  "Janeiro",
                  "Fevereiro",
                  "Março",
                  "Abril",
                  "Maio",
                  "Junho",
                  "Julho",
                  "Agosto",
                  "Setembro",
                  "Outubro",
                  "Novembro",
                  "Dezembro",
                ],
                dayOfWeekShort: [
                  "Dom",
                  "Seg",
                  "Ter",
                  "Qua",
                  "Qui",
                  "Sex",
                  "Sáb",
                ],
                dayOfWeek: [
                  "Domingo",
                  "Segunda",
                  "Terça",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sábado",
                ],
              },
              sk: {
                months: [
                  "Január",
                  "Február",
                  "Marec",
                  "Apríl",
                  "Máj",
                  "Jún",
                  "Júl",
                  "August",
                  "September",
                  "Október",
                  "November",
                  "December",
                ],
                dayOfWeekShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
                dayOfWeek: [
                  "Nedeľa",
                  "Pondelok",
                  "Utorok",
                  "Streda",
                  "Štvrtok",
                  "Piatok",
                  "Sobota",
                ],
              },
              sq: {
                months: [
                  "Janar",
                  "Shkurt",
                  "Mars",
                  "Prill",
                  "Maj",
                  "Qershor",
                  "Korrik",
                  "Gusht",
                  "Shtator",
                  "Tetor",
                  "Nëntor",
                  "Dhjetor",
                ],
                dayOfWeekShort: [
                  "Die",
                  "Hën",
                  "Mar",
                  "Mër",
                  "Enj",
                  "Pre",
                  "Shtu",
                ],
                dayOfWeek: [
                  "E Diel",
                  "E Hënë",
                  "E Martē",
                  "E Mërkurë",
                  "E Enjte",
                  "E Premte",
                  "E Shtunë",
                ],
              },
              "sr-YU": {
                months: [
                  "Januar",
                  "Februar",
                  "Mart",
                  "April",
                  "Maj",
                  "Jun",
                  "Jul",
                  "Avgust",
                  "Septembar",
                  "Oktobar",
                  "Novembar",
                  "Decembar",
                ],
                dayOfWeekShort: [
                  "Ned",
                  "Pon",
                  "Uto",
                  "Sre",
                  "čet",
                  "Pet",
                  "Sub",
                ],
                dayOfWeek: [
                  "Nedelja",
                  "Ponedeljak",
                  "Utorak",
                  "Sreda",
                  "Četvrtak",
                  "Petak",
                  "Subota",
                ],
              },
              sr: {
                months: [
                  "јануар",
                  "фебруар",
                  "март",
                  "април",
                  "мај",
                  "јун",
                  "јул",
                  "август",
                  "септембар",
                  "октобар",
                  "новембар",
                  "децембар",
                ],
                dayOfWeekShort: [
                  "нед",
                  "пон",
                  "уто",
                  "сре",
                  "чет",
                  "пет",
                  "суб",
                ],
                dayOfWeek: [
                  "Недеља",
                  "Понедељак",
                  "Уторак",
                  "Среда",
                  "Четвртак",
                  "Петак",
                  "Субота",
                ],
              },
              sv: {
                months: [
                  "Januari",
                  "Februari",
                  "Mars",
                  "April",
                  "Maj",
                  "Juni",
                  "Juli",
                  "Augusti",
                  "September",
                  "Oktober",
                  "November",
                  "December",
                ],
                dayOfWeekShort: [
                  "Sön",
                  "Mån",
                  "Tis",
                  "Ons",
                  "Tor",
                  "Fre",
                  "Lör",
                ],
                dayOfWeek: [
                  "Söndag",
                  "Måndag",
                  "Tisdag",
                  "Onsdag",
                  "Torsdag",
                  "Fredag",
                  "Lördag",
                ],
              },
              "zh-TW": {
                months: [
                  "一月",
                  "二月",
                  "三月",
                  "四月",
                  "五月",
                  "六月",
                  "七月",
                  "八月",
                  "九月",
                  "十月",
                  "十一月",
                  "十二月",
                ],
                dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                dayOfWeek: [
                  "星期日",
                  "星期一",
                  "星期二",
                  "星期三",
                  "星期四",
                  "星期五",
                  "星期六",
                ],
              },
              zh: {
                months: [
                  "一月",
                  "二月",
                  "三月",
                  "四月",
                  "五月",
                  "六月",
                  "七月",
                  "八月",
                  "九月",
                  "十月",
                  "十一月",
                  "十二月",
                ],
                dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                dayOfWeek: [
                  "星期日",
                  "星期一",
                  "星期二",
                  "星期三",
                  "星期四",
                  "星期五",
                  "星期六",
                ],
              },
              ug: {
                months: [
                  "1-ئاي",
                  "2-ئاي",
                  "3-ئاي",
                  "4-ئاي",
                  "5-ئاي",
                  "6-ئاي",
                  "7-ئاي",
                  "8-ئاي",
                  "9-ئاي",
                  "10-ئاي",
                  "11-ئاي",
                  "12-ئاي",
                ],
                dayOfWeek: [
                  "يەكشەنبە",
                  "دۈشەنبە",
                  "سەيشەنبە",
                  "چارشەنبە",
                  "پەيشەنبە",
                  "جۈمە",
                  "شەنبە",
                ],
              },
              he: {
                months: [
                  "ינואר",
                  "פברואר",
                  "מרץ",
                  "אפריל",
                  "מאי",
                  "יוני",
                  "יולי",
                  "אוגוסט",
                  "ספטמבר",
                  "אוקטובר",
                  "נובמבר",
                  "דצמבר",
                ],
                dayOfWeekShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
                dayOfWeek: [
                  "ראשון",
                  "שני",
                  "שלישי",
                  "רביעי",
                  "חמישי",
                  "שישי",
                  "שבת",
                  "ראשון",
                ],
              },
              hy: {
                months: [
                  "Հունվար",
                  "Փետրվար",
                  "Մարտ",
                  "Ապրիլ",
                  "Մայիս",
                  "Հունիս",
                  "Հուլիս",
                  "Օգոստոս",
                  "Սեպտեմբեր",
                  "Հոկտեմբեր",
                  "Նոյեմբեր",
                  "Դեկտեմբեր",
                ],
                dayOfWeekShort: [
                  "Կի",
                  "Երկ",
                  "Երք",
                  "Չոր",
                  "Հնգ",
                  "Ուրբ",
                  "Շբթ",
                ],
                dayOfWeek: [
                  "Կիրակի",
                  "Երկուշաբթի",
                  "Երեքշաբթի",
                  "Չորեքշաբթի",
                  "Հինգշաբթի",
                  "Ուրբաթ",
                  "Շաբաթ",
                ],
              },
              kg: {
                months: [
                  "Үчтүн айы",
                  "Бирдин айы",
                  "Жалган Куран",
                  "Чын Куран",
                  "Бугу",
                  "Кулжа",
                  "Теке",
                  "Баш Оона",
                  "Аяк Оона",
                  "Тогуздун айы",
                  "Жетинин айы",
                  "Бештин айы",
                ],
                dayOfWeekShort: [
                  "Жек",
                  "Дүй",
                  "Шей",
                  "Шар",
                  "Бей",
                  "Жум",
                  "Ише",
                ],
                dayOfWeek: [
                  "Жекшемб",
                  "Дүйшөмб",
                  "Шейшемб",
                  "Шаршемб",
                  "Бейшемби",
                  "Жума",
                  "Ишенб",
                ],
              },
              rm: {
                months: [
                  "Schaner",
                  "Favrer",
                  "Mars",
                  "Avrigl",
                  "Matg",
                  "Zercladur",
                  "Fanadur",
                  "Avust",
                  "Settember",
                  "October",
                  "November",
                  "December",
                ],
                dayOfWeekShort: ["Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"],
                dayOfWeek: [
                  "Dumengia",
                  "Glindesdi",
                  "Mardi",
                  "Mesemna",
                  "Gievgia",
                  "Venderdi",
                  "Sonda",
                ],
              },
              ka: {
                months: [
                  "იანვარი",
                  "თებერვალი",
                  "მარტი",
                  "აპრილი",
                  "მაისი",
                  "ივნისი",
                  "ივლისი",
                  "აგვისტო",
                  "სექტემბერი",
                  "ოქტომბერი",
                  "ნოემბერი",
                  "დეკემბერი",
                ],
                dayOfWeekShort: [
                  "კვ",
                  "ორშ",
                  "სამშ",
                  "ოთხ",
                  "ხუთ",
                  "პარ",
                  "შაბ",
                ],
                dayOfWeek: [
                  "კვირა",
                  "ორშაბათი",
                  "სამშაბათი",
                  "ოთხშაბათი",
                  "ხუთშაბათი",
                  "პარასკევი",
                  "შაბათი",
                ],
              },
            },
            ownerDocument: document,
            contentWindow: window,
            value: "",
            rtl: !1,
            format: "Y/m/d H:i",
            formatTime: "H:i",
            formatDate: "Y/m/d",
            startDate: !1,
            step: 60,
            monthChangeSpinner: !0,
            closeOnDateSelect: !1,
            closeOnTimeSelect: !0,
            closeOnWithoutClick: !0,
            closeOnInputClick: !0,
            openOnFocus: !0,
            timepicker: !0,
            datepicker: !0,
            weeks: !1,
            defaultTime: !1,
            defaultDate: !1,
            minDate: !1,
            maxDate: !1,
            minTime: !1,
            maxTime: !1,
            minDateTime: !1,
            maxDateTime: !1,
            allowTimes: [],
            opened: !1,
            initTime: !0,
            inline: !1,
            theme: "",
            touchMovedThreshold: 5,
            onSelectDate: function () {},
            onSelectTime: function () {},
            onChangeMonth: function () {},
            onGetWeekOfYear: function () {},
            onChangeYear: function () {},
            onChangeDateTime: function () {},
            onShow: function () {},
            onClose: function () {},
            onGenerate: function () {},
            withoutCopyright: !0,
            inverseButton: !1,
            hours12: !1,
            next: "xdsoft_next",
            prev: "xdsoft_prev",
            dayOfWeekStart: 0,
            parentID: "body",
            timeHeightInTimePicker: 25,
            timepickerScrollbar: !0,
            todayButton: !0,
            prevButton: !0,
            nextButton: !0,
            defaultSelect: !0,
            scrollMonth: !0,
            scrollTime: !0,
            scrollInput: !0,
            lazyInit: !1,
            mask: !1,
            validateOnBlur: !0,
            allowBlank: !0,
            yearStart: 1950,
            yearEnd: 2050,
            monthStart: 0,
            monthEnd: 11,
            style: "",
            id: "",
            fixed: !1,
            roundTime: "round",
            className: "",
            weekends: [],
            highlightedDates: [],
            highlightedPeriods: [],
            allowDates: [],
            allowDateRe: null,
            disabledDates: [],
            disabledWeekDays: [],
            yearOffset: 0,
            beforeShowDay: null,
            enterLikeTab: !0,
            showApplyButton: !1,
          },
          i = null,
          n = null,
          o = "en",
          s = { meridiem: ["AM", "PM"] },
          d = function () {
            var t = a.i18n[o],
              d = {
                days: t.dayOfWeek,
                daysShort: t.dayOfWeekShort,
                months: t.months,
                monthsShort: e.map(t.months, function (e) {
                  return e.substring(0, 3);
                }),
              };
            "function" == typeof r &&
              (i = n = new r({ dateSettings: e.extend({}, s, d) }));
          },
          l = {
            moment: {
              default_options: {
                format: "YYYY/MM/DD HH:mm",
                formatDate: "YYYY/MM/DD",
                formatTime: "HH:mm",
              },
              formatter: {
                parseDate: function (e, t) {
                  if (h(t)) return n.parseDate(e, t);
                  var a = moment(e, t);
                  return !!a.isValid() && a.toDate();
                },
                formatDate: function (e, t) {
                  return h(t) ? n.formatDate(e, t) : moment(e).format(t);
                },
                formatMask: function (e) {
                  return e
                    .replace(/Y{4}/g, "9999")
                    .replace(/Y{2}/g, "99")
                    .replace(/M{2}/g, "19")
                    .replace(/D{2}/g, "39")
                    .replace(/H{2}/g, "29")
                    .replace(/m{2}/g, "59")
                    .replace(/s{2}/g, "59");
                },
              },
            },
          };
        e.datetimepicker = {
          setLocale: function (e) {
            var t = a.i18n[e] ? e : "en";
            o !== t && ((o = t), d());
          },
          setDateFormatter: function (t) {
            if ("string" == typeof t && l.hasOwnProperty(t)) {
              var n = l[t];
              e.extend(a, n.default_options), (i = n.formatter);
            } else i = t;
          },
        };
        var u = {
            RFC_2822: "D, d M Y H:i:s O",
            ATOM: "Y-m-dTH:i:sP",
            ISO_8601: "Y-m-dTH:i:sO",
            RFC_822: "D, d M y H:i:s O",
            RFC_850: "l, d-M-y H:i:s T",
            RFC_1036: "D, d M y H:i:s O",
            RFC_1123: "D, d M Y H:i:s O",
            RSS: "D, d M Y H:i:s O",
            W3C: "Y-m-dTH:i:sP",
          },
          h = function (e) {
            return -1 !== Object.values(u).indexOf(e);
          };
        e.extend(e.datetimepicker, u),
          d(),
          window.getComputedStyle ||
            (window.getComputedStyle = function (e) {
              return (
                (this.el = e),
                (this.getPropertyValue = function (t) {
                  var a = /(-([a-z]))/g;
                  return (
                    "float" === t && (t = "styleFloat"),
                    a.test(t) &&
                      (t = t.replace(a, function (e, t, a) {
                        return a.toUpperCase();
                      })),
                    e.currentStyle[t] || null
                  );
                }),
                this
              );
            }),
          Array.prototype.indexOf ||
            (Array.prototype.indexOf = function (e, t) {
              var a, i;
              for (a = t || 0, i = this.length; a < i; a += 1)
                if (this[a] === e) return a;
              return -1;
            }),
          (Date.prototype.countDaysInMonth = function () {
            return new Date(
              this.getFullYear(),
              this.getMonth() + 1,
              0
            ).getDate();
          }),
          (e.fn.xdsoftScroller = function (t, a) {
            return this.each(function () {
              var i,
                n,
                o,
                r,
                s,
                d = e(this),
                l = function (e) {
                  var t,
                    a = { x: 0, y: 0 };
                  return (
                    "touchstart" === e.type ||
                    "touchmove" === e.type ||
                    "touchend" === e.type ||
                    "touchcancel" === e.type
                      ? ((t =
                          e.originalEvent.touches[0] ||
                          e.originalEvent.changedTouches[0]),
                        (a.x = t.clientX),
                        (a.y = t.clientY))
                      : ("mousedown" !== e.type &&
                          "mouseup" !== e.type &&
                          "mousemove" !== e.type &&
                          "mouseover" !== e.type &&
                          "mouseout" !== e.type &&
                          "mouseenter" !== e.type &&
                          "mouseleave" !== e.type) ||
                        ((a.x = e.clientX), (a.y = e.clientY)),
                    a
                  );
                },
                u = 100,
                h = !1,
                c = 0,
                f = 0,
                m = 0,
                p = !1,
                g = 0,
                v = function () {};
              "hide" !== a
                ? (e(this).hasClass("xdsoft_scroller_box") ||
                    ((i = d.children().eq(0)),
                    (n = d[0].clientHeight),
                    (o = i[0].offsetHeight),
                    (r = e('<div class="xdsoft_scrollbar"></div>')),
                    (s = e('<div class="xdsoft_scroller"></div>')),
                    r.append(s),
                    d.addClass("xdsoft_scroller_box").append(r),
                    (v = function (e) {
                      var t = l(e).y - c + g;
                      t < 0 && (t = 0),
                        t + s[0].offsetHeight > m &&
                          (t = m - s[0].offsetHeight),
                        d.trigger("scroll_element.xdsoft_scroller", [
                          u ? t / u : 0,
                        ]);
                    }),
                    s
                      .on(
                        "touchstart.xdsoft_scroller mousedown.xdsoft_scroller",
                        function (i) {
                          n || d.trigger("resize_scroll.xdsoft_scroller", [a]),
                            (c = l(i).y),
                            (g = parseInt(s.css("margin-top"), 10)),
                            (m = r[0].offsetHeight),
                            "mousedown" === i.type || "touchstart" === i.type
                              ? (t.ownerDocument &&
                                  e(t.ownerDocument.body).addClass(
                                    "xdsoft_noselect"
                                  ),
                                e([t.ownerDocument.body, t.contentWindow]).on(
                                  "touchend mouseup.xdsoft_scroller",
                                  function a() {
                                    e([t.ownerDocument.body, t.contentWindow])
                                      .off(
                                        "touchend mouseup.xdsoft_scroller",
                                        a
                                      )
                                      .off("mousemove.xdsoft_scroller", v)
                                      .removeClass("xdsoft_noselect");
                                  }
                                ),
                                e(t.ownerDocument.body).on(
                                  "mousemove.xdsoft_scroller",
                                  v
                                ))
                              : ((p = !0),
                                i.stopPropagation(),
                                i.preventDefault());
                        }
                      )
                      .on("touchmove", function (e) {
                        p && (e.preventDefault(), v(e));
                      })
                      .on("touchend touchcancel", function () {
                        (p = !1), (g = 0);
                      }),
                    d
                      .on("scroll_element.xdsoft_scroller", function (e, t) {
                        n ||
                          d.trigger("resize_scroll.xdsoft_scroller", [t, !0]),
                          (t = t > 1 ? 1 : t < 0 || isNaN(t) ? 0 : t),
                          s.css("margin-top", u * t),
                          setTimeout(function () {
                            i.css(
                              "marginTop",
                              -parseInt((i[0].offsetHeight - n) * t, 10)
                            );
                          }, 10);
                      })
                      .on("resize_scroll.xdsoft_scroller", function (e, t, a) {
                        var l, h;
                        (n = d[0].clientHeight),
                          (o = i[0].offsetHeight),
                          (h = (l = n / o) * r[0].offsetHeight),
                          l > 1
                            ? s.hide()
                            : (s.show(),
                              s.css("height", parseInt(h > 10 ? h : 10, 10)),
                              (u = r[0].offsetHeight - s[0].offsetHeight),
                              !0 !== a &&
                                d.trigger("scroll_element.xdsoft_scroller", [
                                  t ||
                                    Math.abs(parseInt(i.css("marginTop"), 10)) /
                                      (o - n),
                                ]));
                      }),
                    d.on("mousewheel", function (e) {
                      var t = Math.abs(parseInt(i.css("marginTop"), 10));
                      return (
                        (t -= 20 * e.deltaY) < 0 && (t = 0),
                        d.trigger("scroll_element.xdsoft_scroller", [
                          t / (o - n),
                        ]),
                        e.stopPropagation(),
                        !1
                      );
                    }),
                    d.on("touchstart", function (e) {
                      (h = l(e)),
                        (f = Math.abs(parseInt(i.css("marginTop"), 10)));
                    }),
                    d.on("touchmove", function (e) {
                      if (h) {
                        e.preventDefault();
                        var t = l(e);
                        d.trigger("scroll_element.xdsoft_scroller", [
                          (f - (t.y - h.y)) / (o - n),
                        ]);
                      }
                    }),
                    d.on("touchend touchcancel", function () {
                      (h = !1), (f = 0);
                    })),
                  d.trigger("resize_scroll.xdsoft_scroller", [a]))
                : d.find(".xdsoft_scrollbar").hide();
            });
          }),
          (e.fn.datetimepicker = function (n, r) {
            var s,
              d,
              l = this,
              u = 48,
              h = 57,
              c = 96,
              f = 105,
              m = 17,
              p = 46,
              g = 13,
              v = 27,
              y = 8,
              D = 37,
              k = 38,
              w = 39,
              b = 40,
              T = 9,
              x = 116,
              M = 65,
              S = 67,
              _ = 86,
              O = 90,
              C = 89,
              W = !1,
              F =
                e.isPlainObject(n) || !n
                  ? e.extend(!0, {}, a, n)
                  : e.extend(!0, {}, a),
              A = 0;
            return (
              (s = function (a) {
                function r() {
                  var e,
                    t = !1;
                  return (
                    F.startDate
                      ? (t = P.strToDate(F.startDate))
                      : (t = F.value || (a && a.val && a.val() ? a.val() : ""))
                      ? ((t = P.strToDateTime(t)),
                        F.yearOffset &&
                          (t = new Date(
                            t.getFullYear() - F.yearOffset,
                            t.getMonth(),
                            t.getDate(),
                            t.getHours(),
                            t.getMinutes(),
                            t.getSeconds(),
                            t.getMilliseconds()
                          )))
                      : F.defaultDate &&
                        ((t = P.strToDateTime(F.defaultDate)),
                        F.defaultTime &&
                          ((e = P.strtotime(F.defaultTime)),
                          t.setHours(e.getHours()),
                          t.setMinutes(e.getMinutes()))),
                    t && P.isValidDate(t) ? z.data("changed", !0) : (t = ""),
                    t || 0
                  );
                }
                function s(t) {
                  var n = function (e, t) {
                      var a = e
                        .replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1")
                        .replace(/_/g, "{digit+}")
                        .replace(/([0-9]{1})/g, "{digit$1}")
                        .replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}")
                        .replace(/\{digit[\+]\}/g, "[0-9_]{1}");
                      return new RegExp(a).test(t);
                    },
                    o = function (e, a) {
                      if (
                        !(e =
                          "string" == typeof e || e instanceof String
                            ? t.ownerDocument.getElementById(e)
                            : e)
                      )
                        return !1;
                      if (e.createTextRange) {
                        var i = e.createTextRange();
                        return (
                          i.collapse(!0),
                          i.moveEnd("character", a),
                          i.moveStart("character", a),
                          i.select(),
                          !0
                        );
                      }
                      return (
                        !!e.setSelectionRange && (e.setSelectionRange(a, a), !0)
                      );
                    };
                  t.mask && a.off("keydown.xdsoft"),
                    !0 === t.mask &&
                      (i.formatMask
                        ? (t.mask = i.formatMask(t.format))
                        : (t.mask = t.format
                            .replace(/Y/g, "9999")
                            .replace(/F/g, "9999")
                            .replace(/m/g, "19")
                            .replace(/d/g, "39")
                            .replace(/H/g, "29")
                            .replace(/i/g, "59")
                            .replace(/s/g, "59"))),
                    "string" === e.type(t.mask) &&
                      (n(t.mask, a.val()) ||
                        (a.val(t.mask.replace(/[0-9]/g, "_")), o(a[0], 0)),
                      a.on("paste.xdsoft", function (i) {
                        var r = (
                            i.clipboardData ||
                            i.originalEvent.clipboardData ||
                            window.clipboardData
                          ).getData("text"),
                          s = this.value,
                          d = this.selectionStart;
                        return (
                          (s = s.substr(0, d) + r + s.substr(d + r.length)),
                          (d += r.length),
                          n(t.mask, s)
                            ? ((this.value = s), o(this, d))
                            : "" === e.trim(s)
                            ? (this.value = t.mask.replace(/[0-9]/g, "_"))
                            : a.trigger("error_input.xdsoft"),
                          i.preventDefault(),
                          !1
                        );
                      }),
                      a.on("keydown.xdsoft", function (i) {
                        var r,
                          s = this.value,
                          d = i.which,
                          l = this.selectionStart,
                          F = this.selectionEnd,
                          A = l !== F;
                        if (
                          (d >= u && d <= h) ||
                          (d >= c && d <= f) ||
                          d === y ||
                          d === p
                        ) {
                          for (
                            r =
                              d === y || d === p
                                ? "_"
                                : String.fromCharCode(
                                    c <= d && d <= f ? d - u : d
                                  ),
                              d === y && l && !A && (l -= 1);
                            ;

                          ) {
                            var Y = t.mask.substr(l, 1),
                              P = l < t.mask.length,
                              N = l > 0;
                            if (!(/[^0-9_]/.test(Y) && P && N)) break;
                            l += d !== y || A ? 1 : -1;
                          }
                          if (A) {
                            var z = F - l,
                              U = t.mask.replace(/[0-9]/g, "_"),
                              I = U.substr(l, z).substr(1);
                            s = s.substr(0, l) + (r + I) + s.substr(l + z);
                          } else s = s.substr(0, l) + r + s.substr(l + 1);
                          if ("" === e.trim(s)) s = U;
                          else if (l === t.mask.length)
                            return i.preventDefault(), !1;
                          for (
                            l += d === y ? 0 : 1;
                            /[^0-9_]/.test(t.mask.substr(l, 1)) &&
                            l < t.mask.length &&
                            l > 0;

                          )
                            l += d === y ? 0 : 1;
                          n(t.mask, s)
                            ? ((this.value = s), o(this, l))
                            : "" === e.trim(s)
                            ? (this.value = t.mask.replace(/[0-9]/g, "_"))
                            : a.trigger("error_input.xdsoft");
                        } else if ((-1 !== [M, S, _, O, C].indexOf(d) && W) || -1 !== [v, k, b, D, w, x, m, T, g].indexOf(d)) return !0;
                        return i.preventDefault(), !1;
                      }));
                }
                var d,
                  l,
                  A,
                  Y,
                  P,
                  N,
                  z = e(
                    '<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'
                  ),
                  U = e(
                    '<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'
                  ),
                  I = e('<div class="xdsoft_datepicker active"></div>'),
                  V = e(
                    '<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'
                  ),
                  j = e('<div class="xdsoft_calendar"></div>'),
                  E = e(
                    '<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'
                  ),
                  H = E.find(".xdsoft_time_box").eq(0),
                  $ = e('<div class="xdsoft_time_variant"></div>'),
                  J = e(
                    '<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'
                  ),
                  L = e(
                    '<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'
                  ),
                  R = e(
                    '<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'
                  ),
                  B = !1,
                  G = 0;
                F.id && z.attr("id", F.id),
                  F.style && z.attr("style", F.style),
                  F.weeks && z.addClass("xdsoft_showweeks"),
                  F.rtl && z.addClass("xdsoft_rtl"),
                  z.addClass("xdsoft_" + F.theme),
                  z.addClass(F.className),
                  V.find(".xdsoft_month span").after(L),
                  V.find(".xdsoft_year span").after(R),
                  V.find(".xdsoft_month,.xdsoft_year").on(
                    "touchstart mousedown.xdsoft",
                    function (t) {
                      var a,
                        i,
                        n = e(this).find(".xdsoft_select").eq(0),
                        o = 0,
                        r = 0,
                        s = n.is(":visible");
                      for (
                        V.find(".xdsoft_select").hide(),
                          P.currentTime &&
                            (o =
                              P.currentTime[
                                e(this).hasClass("xdsoft_month")
                                  ? "getMonth"
                                  : "getFullYear"
                              ]()),
                          n[s ? "hide" : "show"](),
                          a = n.find("div.xdsoft_option"),
                          i = 0;
                        i < a.length && a.eq(i).data("value") !== o;
                        i += 1
                      )
                        r += a[0].offsetHeight;
                      return (
                        n.xdsoftScroller(
                          F,
                          r / (n.children()[0].offsetHeight - n[0].clientHeight)
                        ),
                        t.stopPropagation(),
                        !1
                      );
                    }
                  );
                var X = function (e) {
                  var t = e.originalEvent,
                    a = t.touches ? t.touches[0] : t;
                  this.touchStartPosition = this.touchStartPosition || a;
                  var i = Math.abs(this.touchStartPosition.clientX - a.clientX),
                    n = Math.abs(this.touchStartPosition.clientY - a.clientY);
                  Math.sqrt(i * i + n * n) > F.touchMovedThreshold &&
                    (this.touchMoved = !0);
                };
                V.find(".xdsoft_select")
                  .xdsoftScroller(F)
                  .on("touchstart mousedown.xdsoft", function (e) {
                    var t = e.originalEvent;
                    (this.touchMoved = !1),
                      (this.touchStartPosition = t.touches ? t.touches[0] : t),
                      e.stopPropagation(),
                      e.preventDefault();
                  })
                  .on("touchmove", ".xdsoft_option", X)
                  .on(
                    "touchend mousedown.xdsoft",
                    ".xdsoft_option",
                    function () {
                      if (!this.touchMoved) {
                        (void 0 !== P.currentTime && null !== P.currentTime) ||
                          (P.currentTime = P.now());
                        var t = P.currentTime.getFullYear();
                        P &&
                          P.currentTime &&
                          P.currentTime[
                            e(this)
                              .parent()
                              .parent()
                              .hasClass("xdsoft_monthselect")
                              ? "setMonth"
                              : "setFullYear"
                          ](e(this).data("value")),
                          e(this).parent().parent().hide(),
                          z.trigger("xchange.xdsoft"),
                          F.onChangeMonth &&
                            e.isFunction(F.onChangeMonth) &&
                            F.onChangeMonth.call(
                              z,
                              P.currentTime,
                              z.data("input")
                            ),
                          t !== P.currentTime.getFullYear() &&
                            e.isFunction(F.onChangeYear) &&
                            F.onChangeYear.call(
                              z,
                              P.currentTime,
                              z.data("input")
                            );
                      }
                    }
                  ),
                  (z.getValue = function () {
                    return P.getCurrentTime();
                  }),
                  (z.setOptions = function (n) {
                    var o = {};
                    (F = e.extend(!0, {}, F, n)),
                      n.allowTimes &&
                        e.isArray(n.allowTimes) &&
                        n.allowTimes.length &&
                        (F.allowTimes = e.extend(!0, [], n.allowTimes)),
                      n.weekends &&
                        e.isArray(n.weekends) &&
                        n.weekends.length &&
                        (F.weekends = e.extend(!0, [], n.weekends)),
                      n.allowDates &&
                        e.isArray(n.allowDates) &&
                        n.allowDates.length &&
                        (F.allowDates = e.extend(!0, [], n.allowDates)),
                      n.allowDateRe &&
                        "[object String]" ===
                          Object.prototype.toString.call(n.allowDateRe) &&
                        (F.allowDateRe = new RegExp(n.allowDateRe)),
                      n.highlightedDates &&
                        e.isArray(n.highlightedDates) &&
                        n.highlightedDates.length &&
                        (e.each(n.highlightedDates, function (a, n) {
                          var r,
                            s = e.map(n.split(","), e.trim),
                            d = new t(
                              i.parseDate(s[0], F.formatDate),
                              s[1],
                              s[2]
                            ),
                            l = i.formatDate(d.date, F.formatDate);
                          void 0 !== o[l]
                            ? (r = o[l].desc) &&
                              r.length &&
                              d.desc &&
                              d.desc.length &&
                              (o[l].desc = r + "\n" + d.desc)
                            : (o[l] = d);
                        }),
                        (F.highlightedDates = e.extend(!0, [], o))),
                      n.highlightedPeriods &&
                        e.isArray(n.highlightedPeriods) &&
                        n.highlightedPeriods.length &&
                        ((o = e.extend(!0, [], F.highlightedDates)),
                        e.each(n.highlightedPeriods, function (a, n) {
                          var r, s, d, l, u, h, c;
                          if (e.isArray(n))
                            (r = n[0]), (s = n[1]), (d = n[2]), (c = n[3]);
                          else {
                            var f = e.map(n.split(","), e.trim);
                            (r = i.parseDate(f[0], F.formatDate)),
                              (s = i.parseDate(f[1], F.formatDate)),
                              (d = f[2]),
                              (c = f[3]);
                          }
                          for (; r <= s; )
                            (l = new t(r, d, c)),
                              (u = i.formatDate(r, F.formatDate)),
                              r.setDate(r.getDate() + 1),
                              void 0 !== o[u]
                                ? (h = o[u].desc) &&
                                  h.length &&
                                  l.desc &&
                                  l.desc.length &&
                                  (o[u].desc = h + "\n" + l.desc)
                                : (o[u] = l);
                        }),
                        (F.highlightedDates = e.extend(!0, [], o))),
                      n.disabledDates &&
                        e.isArray(n.disabledDates) &&
                        n.disabledDates.length &&
                        (F.disabledDates = e.extend(!0, [], n.disabledDates)),
                      n.disabledWeekDays &&
                        e.isArray(n.disabledWeekDays) &&
                        n.disabledWeekDays.length &&
                        (F.disabledWeekDays = e.extend(
                          !0,
                          [],
                          n.disabledWeekDays
                        )),
                      (!F.open && !F.opened) ||
                        F.inline ||
                        a.trigger("open.xdsoft"),
                      F.inline &&
                        ((B = !0),
                        z.addClass("xdsoft_inline"),
                        a.after(z).hide()),
                      F.inverseButton &&
                        ((F.next = "xdsoft_prev"), (F.prev = "xdsoft_next")),
                      F.datepicker
                        ? I.addClass("active")
                        : I.removeClass("active"),
                      F.timepicker
                        ? E.addClass("active")
                        : E.removeClass("active"),
                      F.value &&
                        (P.setCurrentTime(F.value), a && a.val && a.val(P.str)),
                      isNaN(F.dayOfWeekStart)
                        ? (F.dayOfWeekStart = 0)
                        : (F.dayOfWeekStart =
                            parseInt(F.dayOfWeekStart, 10) % 7),
                      F.timepickerScrollbar || H.xdsoftScroller(F, "hide"),
                      F.minDate &&
                        /^[\+\-](.*)$/.test(F.minDate) &&
                        (F.minDate = i.formatDate(
                          P.strToDateTime(F.minDate),
                          F.formatDate
                        )),
                      F.maxDate &&
                        /^[\+\-](.*)$/.test(F.maxDate) &&
                        (F.maxDate = i.formatDate(
                          P.strToDateTime(F.maxDate),
                          F.formatDate
                        )),
                      F.minDateTime &&
                        /^\+(.*)$/.test(F.minDateTime) &&
                        (F.minDateTime = P.strToDateTime(
                          F.minDateTime
                        ).dateFormat(F.formatDate)),
                      F.maxDateTime &&
                        /^\+(.*)$/.test(F.maxDateTime) &&
                        (F.maxDateTime = P.strToDateTime(
                          F.maxDateTime
                        ).dateFormat(F.formatDate)),
                      J.toggle(F.showApplyButton),
                      V.find(".xdsoft_today_button").css(
                        "visibility",
                        F.todayButton ? "visible" : "hidden"
                      ),
                      V.find("." + F.prev).css(
                        "visibility",
                        F.prevButton ? "visible" : "hidden"
                      ),
                      V.find("." + F.next).css(
                        "visibility",
                        F.nextButton ? "visible" : "hidden"
                      ),
                      s(F),
                      F.validateOnBlur &&
                        a.off("blur.xdsoft").on("blur.xdsoft", function () {
                          if (
                            F.allowBlank &&
                            (!e.trim(e(this).val()).length ||
                              ("string" == typeof F.mask &&
                                e.trim(e(this).val()) ===
                                  F.mask.replace(/[0-9]/g, "_")))
                          )
                            e(this).val(null),
                              z.data("xdsoft_datetime").empty();
                          else {
                            var t = i.parseDate(e(this).val(), F.format);
                            if (t) e(this).val(i.formatDate(t, F.format));
                            else {
                              var a = +[
                                  e(this).val()[0],
                                  e(this).val()[1],
                                ].join(""),
                                n = +[e(this).val()[2], e(this).val()[3]].join(
                                  ""
                                );
                              !F.datepicker &&
                              F.timepicker &&
                              a >= 0 &&
                              a < 24 &&
                              n >= 0 &&
                              n < 60
                                ? e(this).val(
                                    [a, n]
                                      .map(function (e) {
                                        return e > 9 ? e : "0" + e;
                                      })
                                      .join(":")
                                  )
                                : e(this).val(i.formatDate(P.now(), F.format));
                            }
                            z.data("xdsoft_datetime").setCurrentTime(
                              e(this).val()
                            );
                          }
                          z.trigger("changedatetime.xdsoft"),
                            z.trigger("close.xdsoft");
                        }),
                      (F.dayOfWeekStartPrev =
                        0 === F.dayOfWeekStart ? 6 : F.dayOfWeekStart - 1),
                      z.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft");
                  }),
                  z
                    .data("options", F)
                    .on("touchstart mousedown.xdsoft", function (e) {
                      return (
                        e.stopPropagation(),
                        e.preventDefault(),
                        R.hide(),
                        L.hide(),
                        !1
                      );
                    }),
                  H.append($),
                  H.xdsoftScroller(F),
                  z.on("afterOpen.xdsoft", function () {
                    H.xdsoftScroller(F);
                  }),
                  z.append(I).append(E),
                  !0 !== F.withoutCopyright && z.append(U),
                  I.append(V).append(j).append(J),
                  e(F.parentID).append(z),
                  (P = new (function () {
                    var t = this;
                    (t.now = function (e) {
                      var a,
                        i,
                        n = new Date();
                      return (
                        !e &&
                          F.defaultDate &&
                          ((a = t.strToDateTime(F.defaultDate)),
                          n.setFullYear(a.getFullYear()),
                          n.setMonth(a.getMonth()),
                          n.setDate(a.getDate())),
                        n.setFullYear(n.getFullYear()),
                        !e &&
                          F.defaultTime &&
                          ((i = t.strtotime(F.defaultTime)),
                          n.setHours(i.getHours()),
                          n.setMinutes(i.getMinutes()),
                          n.setSeconds(i.getSeconds()),
                          n.setMilliseconds(i.getMilliseconds())),
                        n
                      );
                    }),
                      (t.isValidDate = function (e) {
                        return (
                          "[object Date]" ===
                            Object.prototype.toString.call(e) &&
                          !isNaN(e.getTime())
                        );
                      }),
                      (t.setCurrentTime = function (e, a) {
                        "string" == typeof e
                          ? (t.currentTime = t.strToDateTime(e))
                          : t.isValidDate(e)
                          ? (t.currentTime = e)
                          : e || a || !F.allowBlank || F.inline
                          ? (t.currentTime = t.now())
                          : (t.currentTime = null),
                          z.trigger("xchange.xdsoft");
                      }),
                      (t.empty = function () {
                        t.currentTime = null;
                      }),
                      (t.getCurrentTime = function () {
                        return t.currentTime;
                      }),
                      (t.nextMonth = function () {
                        (void 0 !== t.currentTime && null !== t.currentTime) ||
                          (t.currentTime = t.now());
                        var a,
                          i = t.currentTime.getMonth() + 1;
                        return (
                          12 === i &&
                            (t.currentTime.setFullYear(
                              t.currentTime.getFullYear() + 1
                            ),
                            (i = 0)),
                          (a = t.currentTime.getFullYear()),
                          t.currentTime.setDate(
                            Math.min(
                              new Date(
                                t.currentTime.getFullYear(),
                                i + 1,
                                0
                              ).getDate(),
                              t.currentTime.getDate()
                            )
                          ),
                          t.currentTime.setMonth(i),
                          F.onChangeMonth &&
                            e.isFunction(F.onChangeMonth) &&
                            F.onChangeMonth.call(
                              z,
                              P.currentTime,
                              z.data("input")
                            ),
                          a !== t.currentTime.getFullYear() &&
                            e.isFunction(F.onChangeYear) &&
                            F.onChangeYear.call(
                              z,
                              P.currentTime,
                              z.data("input")
                            ),
                          z.trigger("xchange.xdsoft"),
                          i
                        );
                      }),
                      (t.prevMonth = function () {
                        (void 0 !== t.currentTime && null !== t.currentTime) ||
                          (t.currentTime = t.now());
                        var a = t.currentTime.getMonth() - 1;
                        return (
                          -1 === a &&
                            (t.currentTime.setFullYear(
                              t.currentTime.getFullYear() - 1
                            ),
                            (a = 11)),
                          t.currentTime.setDate(
                            Math.min(
                              new Date(
                                t.currentTime.getFullYear(),
                                a + 1,
                                0
                              ).getDate(),
                              t.currentTime.getDate()
                            )
                          ),
                          t.currentTime.setMonth(a),
                          F.onChangeMonth &&
                            e.isFunction(F.onChangeMonth) &&
                            F.onChangeMonth.call(
                              z,
                              P.currentTime,
                              z.data("input")
                            ),
                          z.trigger("xchange.xdsoft"),
                          a
                        );
                      }),
                      (t.getWeekOfYear = function (t) {
                        if (
                          F.onGetWeekOfYear &&
                          e.isFunction(F.onGetWeekOfYear)
                        ) {
                          var a = F.onGetWeekOfYear.call(z, t);
                          if (void 0 !== a) return a;
                        }
                        var i = new Date(t.getFullYear(), 0, 1);
                        return (
                          4 !== i.getDay() &&
                            i.setMonth(0, 1 + ((4 - i.getDay() + 7) % 7)),
                          Math.ceil(((t - i) / 864e5 + i.getDay() + 1) / 7)
                        );
                      }),
                      (t.strToDateTime = function (e) {
                        var a,
                          n,
                          o = [];
                        return e && e instanceof Date && t.isValidDate(e)
                          ? e
                          : ((o = /^([+-]{1})(.*)$/.exec(e)) &&
                              (o[2] = i.parseDate(o[2], F.formatDate)),
                            o && o[2]
                              ? ((a =
                                  o[2].getTime() -
                                  6e4 * o[2].getTimezoneOffset()),
                                (n = new Date(
                                  t.now(!0).getTime() +
                                    parseInt(o[1] + "1", 10) * a
                                )))
                              : (n = e ? i.parseDate(e, F.format) : t.now()),
                            t.isValidDate(n) || (n = t.now()),
                            n);
                      }),
                      (t.strToDate = function (e) {
                        if (e && e instanceof Date && t.isValidDate(e))
                          return e;
                        var a = e ? i.parseDate(e, F.formatDate) : t.now(!0);
                        return t.isValidDate(a) || (a = t.now(!0)), a;
                      }),
                      (t.strtotime = function (e) {
                        if (e && e instanceof Date && t.isValidDate(e))
                          return e;
                        var a = e ? i.parseDate(e, F.formatTime) : t.now(!0);
                        return t.isValidDate(a) || (a = t.now(!0)), a;
                      }),
                      (t.str = function () {
                        var e = F.format;
                        return (
                          F.yearOffset &&
                            (e = (e = e.replace(
                              "Y",
                              t.currentTime.getFullYear() + F.yearOffset
                            )).replace(
                              "y",
                              String(
                                t.currentTime.getFullYear() + F.yearOffset
                              ).substring(2, 4)
                            )),
                          i.formatDate(t.currentTime, e)
                        );
                      }),
                      (t.currentTime = this.now());
                  })()),
                  J.on("touchend click", function (e) {
                    e.preventDefault(),
                      z.data("changed", !0),
                      P.setCurrentTime(r()),
                      a.val(P.str()),
                      z.trigger("close.xdsoft");
                  }),
                  V.find(".xdsoft_today_button")
                    .on("touchend mousedown.xdsoft", function () {
                      z.data("changed", !0),
                        P.setCurrentTime(0, !0),
                        z.trigger("afterOpen.xdsoft");
                    })
                    .on("dblclick.xdsoft", function () {
                      var e,
                        t,
                        i = P.getCurrentTime();
                      (i = new Date(
                        i.getFullYear(),
                        i.getMonth(),
                        i.getDate()
                      )),
                        (e = P.strToDate(F.minDate)),
                        i <
                          (e = new Date(
                            e.getFullYear(),
                            e.getMonth(),
                            e.getDate()
                          )) ||
                          ((t = P.strToDate(F.maxDate)),
                          i >
                            (t = new Date(
                              t.getFullYear(),
                              t.getMonth(),
                              t.getDate()
                            )) ||
                            (a.val(P.str()),
                            a.trigger("change"),
                            z.trigger("close.xdsoft")));
                    }),
                  V.find(".xdsoft_prev,.xdsoft_next").on(
                    "touchend mousedown.xdsoft",
                    function () {
                      var t = e(this),
                        a = 0,
                        i = !1;
                      !(function e(n) {
                        t.hasClass(F.next)
                          ? P.nextMonth()
                          : t.hasClass(F.prev) && P.prevMonth(),
                          F.monthChangeSpinner &&
                            (i || (a = setTimeout(e, n || 100)));
                      })(500),
                        e([F.ownerDocument.body, F.contentWindow]).on(
                          "touchend mouseup.xdsoft",
                          function t() {
                            clearTimeout(a),
                              (i = !0),
                              e([F.ownerDocument.body, F.contentWindow]).off(
                                "touchend mouseup.xdsoft",
                                t
                              );
                          }
                        );
                    }
                  ),
                  E.find(".xdsoft_prev,.xdsoft_next").on(
                    "touchend mousedown.xdsoft",
                    function () {
                      var t = e(this),
                        a = 0,
                        i = !1,
                        n = 110;
                      !(function e(o) {
                        var r = H[0].clientHeight,
                          s = $[0].offsetHeight,
                          d = Math.abs(parseInt($.css("marginTop"), 10));
                        t.hasClass(F.next) &&
                        s - r - F.timeHeightInTimePicker >= d
                          ? $.css(
                              "marginTop",
                              "-" + (d + F.timeHeightInTimePicker) + "px"
                            )
                          : t.hasClass(F.prev) &&
                            d - F.timeHeightInTimePicker >= 0 &&
                            $.css(
                              "marginTop",
                              "-" + (d - F.timeHeightInTimePicker) + "px"
                            ),
                          H.trigger("scroll_element.xdsoft_scroller", [
                            Math.abs(
                              parseInt($[0].style.marginTop, 10) / (s - r)
                            ),
                          ]),
                          (n = n > 10 ? 10 : n - 10),
                          i || (a = setTimeout(e, o || n));
                      })(500),
                        e([F.ownerDocument.body, F.contentWindow]).on(
                          "touchend mouseup.xdsoft",
                          function t() {
                            clearTimeout(a),
                              (i = !0),
                              e([F.ownerDocument.body, F.contentWindow]).off(
                                "touchend mouseup.xdsoft",
                                t
                              );
                          }
                        );
                    }
                  ),
                  (d = 0),
                  z
                    .on("xchange.xdsoft", function (t) {
                      clearTimeout(d),
                        (d = setTimeout(function () {
                          (void 0 !== P.currentTime &&
                            null !== P.currentTime) ||
                            (P.currentTime = P.now());
                          for (
                            var t,
                              r,
                              s,
                              d,
                              l,
                              u,
                              h,
                              c,
                              f,
                              m,
                              p = "",
                              g = new Date(
                                P.currentTime.getFullYear(),
                                P.currentTime.getMonth(),
                                1,
                                12,
                                0,
                                0
                              ),
                              v = 0,
                              y = P.now(),
                              D = !1,
                              k = !1,
                              w = !1,
                              b = !1,
                              T = [],
                              x = !0,
                              M = "";
                            g.getDay() !== F.dayOfWeekStart;

                          )
                            g.setDate(g.getDate() - 1);
                          for (
                            p += "<table><thead><tr>",
                              F.weeks && (p += "<th></th>"),
                              t = 0;
                            t < 7;
                            t += 1
                          )
                            p +=
                              "<th>" +
                              F.i18n[o].dayOfWeekShort[
                                (t + F.dayOfWeekStart) % 7
                              ] +
                              "</th>";
                          var S;
                          for (
                            p += "</tr></thead>",
                              p += "<tbody>",
                              !1 !== F.maxDate &&
                                ((D = P.strToDate(F.maxDate)),
                                (D = new Date(
                                  D.getFullYear(),
                                  D.getMonth(),
                                  D.getDate(),
                                  23,
                                  59,
                                  59,
                                  999
                                ))),
                              !1 !== F.minDate &&
                                ((k = P.strToDate(F.minDate)),
                                (k = new Date(
                                  k.getFullYear(),
                                  k.getMonth(),
                                  k.getDate()
                                ))),
                              !1 !== F.minDateTime &&
                                ((w = P.strToDate(F.minDateTime)),
                                (w = new Date(
                                  w.getFullYear(),
                                  w.getMonth(),
                                  w.getDate(),
                                  w.getHours(),
                                  w.getMinutes(),
                                  w.getSeconds()
                                ))),
                              !1 !== F.maxDateTime &&
                                ((b = P.strToDate(F.maxDateTime)),
                                (b = new Date(
                                  b.getFullYear(),
                                  b.getMonth(),
                                  b.getDate(),
                                  b.getHours(),
                                  b.getMinutes(),
                                  b.getSeconds()
                                ))),
                              !1 !== b &&
                                (S =
                                  31 * (12 * b.getFullYear() + b.getMonth()) +
                                  b.getDate());
                            v < P.currentTime.countDaysInMonth() ||
                            g.getDay() !== F.dayOfWeekStart ||
                            P.currentTime.getMonth() === g.getMonth();

                          ) {
                            (T = []),
                              (v += 1),
                              (s = g.getDay()),
                              (d = g.getDate()),
                              (l = g.getFullYear()),
                              (u = g.getMonth()),
                              (h = P.getWeekOfYear(g)),
                              (m = ""),
                              T.push("xdsoft_date"),
                              (c =
                                F.beforeShowDay &&
                                e.isFunction(F.beforeShowDay.call)
                                  ? F.beforeShowDay.call(z, g)
                                  : null),
                              F.allowDateRe &&
                                "[object RegExp]" ===
                                  Object.prototype.toString.call(
                                    F.allowDateRe
                                  ) &&
                                (F.allowDateRe.test(
                                  i.formatDate(g, F.formatDate)
                                ) ||
                                  T.push("xdsoft_disabled")),
                              F.allowDates &&
                                F.allowDates.length > 0 &&
                                -1 ===
                                  F.allowDates.indexOf(
                                    i.formatDate(g, F.formatDate)
                                  ) &&
                                T.push("xdsoft_disabled");
                            var _ =
                              31 * (12 * g.getFullYear() + g.getMonth()) +
                              g.getDate();
                            ((!1 !== D && g > D) ||
                              (!1 !== w && g < w) ||
                              (!1 !== k && g < k) ||
                              (!1 !== b && _ > S) ||
                              (c && !1 === c[0])) &&
                              T.push("xdsoft_disabled"),
                              -1 !==
                                F.disabledDates.indexOf(
                                  i.formatDate(g, F.formatDate)
                                ) && T.push("xdsoft_disabled"),
                              -1 !== F.disabledWeekDays.indexOf(s) &&
                                T.push("xdsoft_disabled"),
                              a.is("[disabled]") && T.push("xdsoft_disabled"),
                              c && "" !== c[1] && T.push(c[1]),
                              P.currentTime.getMonth() !== u &&
                                T.push("xdsoft_other_month"),
                              (F.defaultSelect || z.data("changed")) &&
                                i.formatDate(P.currentTime, F.formatDate) ===
                                  i.formatDate(g, F.formatDate) &&
                                T.push("xdsoft_current"),
                              i.formatDate(y, F.formatDate) ===
                                i.formatDate(g, F.formatDate) &&
                                T.push("xdsoft_today"),
                              (0 !== g.getDay() &&
                                6 !== g.getDay() &&
                                -1 ===
                                  F.weekends.indexOf(
                                    i.formatDate(g, F.formatDate)
                                  )) ||
                                T.push("xdsoft_weekend"),
                              void 0 !==
                                F.highlightedDates[
                                  i.formatDate(g, F.formatDate)
                                ] &&
                                ((r =
                                  F.highlightedDates[
                                    i.formatDate(g, F.formatDate)
                                  ]),
                                T.push(
                                  void 0 === r.style
                                    ? "xdsoft_highlighted_default"
                                    : r.style
                                ),
                                (m = void 0 === r.desc ? "" : r.desc)),
                              F.beforeShowDay &&
                                e.isFunction(F.beforeShowDay) &&
                                T.push(F.beforeShowDay(g)),
                              x &&
                                ((p += "<tr>"),
                                (x = !1),
                                F.weeks && (p += "<th>" + h + "</th>")),
                              (p +=
                                '<td data-date="' +
                                d +
                                '" data-month="' +
                                u +
                                '" data-year="' +
                                l +
                                '" class="xdsoft_date xdsoft_day_of_week' +
                                g.getDay() +
                                " " +
                                T.join(" ") +
                                '" title="' +
                                m +
                                '"><div>' +
                                d +
                                "</div></td>"),
                              g.getDay() === F.dayOfWeekStartPrev &&
                                ((p += "</tr>"), (x = !0)),
                              g.setDate(d + 1);
                          }
                          (p += "</tbody></table>"),
                            j.html(p),
                            V.find(".xdsoft_label span")
                              .eq(0)
                              .text(F.i18n[o].months[P.currentTime.getMonth()]),
                            V.find(".xdsoft_label span")
                              .eq(1)
                              .text(P.currentTime.getFullYear() + F.yearOffset),
                            (M = ""),
                            (u = "");
                          var O = 0;
                          !1 !== F.minTime &&
                            ((W = P.strtotime(F.minTime)),
                            (O = 60 * W.getHours() + W.getMinutes()));
                          var C = 1440;
                          if (
                            (!1 !== F.maxTime &&
                              ((W = P.strtotime(F.maxTime)),
                              (C = 60 * W.getHours() + W.getMinutes())),
                            !1 !== F.minDateTime &&
                              ((W = P.strToDateTime(F.minDateTime)),
                              i.formatDate(P.currentTime, F.formatDate) ===
                                i.formatDate(W, F.formatDate) &&
                                (u = 60 * W.getHours() + W.getMinutes()) > O &&
                                (O = u)),
                            !1 !== F.maxDateTime)
                          ) {
                            var W = P.strToDateTime(F.maxDateTime);
                            i.formatDate(P.currentTime, F.formatDate) ===
                              i.formatDate(W, F.formatDate) &&
                              (u = 60 * W.getHours() + W.getMinutes()) < C &&
                              (C = u);
                          }
                          if (
                            ((f = function (t, n) {
                              var o,
                                r = P.now(),
                                s =
                                  F.allowTimes &&
                                  e.isArray(F.allowTimes) &&
                                  F.allowTimes.length;
                              r.setHours(t),
                                (t = parseInt(r.getHours(), 10)),
                                r.setMinutes(n),
                                (n = parseInt(r.getMinutes(), 10)),
                                (T = []);
                              var d = 60 * t + n;
                              (a.is("[disabled]") || d >= C || d < O) &&
                                T.push("xdsoft_disabled"),
                                (o = new Date(P.currentTime)).setHours(
                                  parseInt(P.currentTime.getHours(), 10)
                                ),
                                s ||
                                  o.setMinutes(
                                    Math[F.roundTime](
                                      P.currentTime.getMinutes() / F.step
                                    ) * F.step
                                  ),
                                (F.initTime ||
                                  F.defaultSelect ||
                                  z.data("changed")) &&
                                  o.getHours() === parseInt(t, 10) &&
                                  ((!s && F.step > 59) ||
                                    o.getMinutes() === parseInt(n, 10)) &&
                                  (F.defaultSelect || z.data("changed")
                                    ? T.push("xdsoft_current")
                                    : F.initTime && T.push("xdsoft_init_time")),
                                parseInt(y.getHours(), 10) ===
                                  parseInt(t, 10) &&
                                  parseInt(y.getMinutes(), 10) ===
                                    parseInt(n, 10) &&
                                  T.push("xdsoft_today"),
                                (M +=
                                  '<div class="xdsoft_time ' +
                                  T.join(" ") +
                                  '" data-hour="' +
                                  t +
                                  '" data-minute="' +
                                  n +
                                  '">' +
                                  i.formatDate(r, F.formatTime) +
                                  "</div>");
                            }),
                            F.allowTimes &&
                              e.isArray(F.allowTimes) &&
                              F.allowTimes.length)
                          )
                            for (v = 0; v < F.allowTimes.length; v += 1)
                              f(
                                P.strtotime(F.allowTimes[v]).getHours(),
                                (u = P.strtotime(F.allowTimes[v]).getMinutes())
                              );
                          else
                            for (
                              v = 0, t = 0;
                              v < (F.hours12 ? 12 : 24);
                              v += 1
                            )
                              for (t = 0; t < 60; t += F.step) {
                                var A = 60 * v + t;
                                A < O ||
                                  A >= C ||
                                  f(
                                    (v < 10 ? "0" : "") + v,
                                    (u = (t < 10 ? "0" : "") + t)
                                  );
                              }
                          for (
                            $.html(M), n = "", v = parseInt(F.yearStart, 10);
                            v <= parseInt(F.yearEnd, 10);
                            v += 1
                          )
                            n +=
                              '<div class="xdsoft_option ' +
                              (P.currentTime.getFullYear() === v
                                ? "xdsoft_current"
                                : "") +
                              '" data-value="' +
                              v +
                              '">' +
                              (v + F.yearOffset) +
                              "</div>";
                          for (
                            R.children().eq(0).html(n),
                              v = parseInt(F.monthStart, 10),
                              n = "";
                            v <= parseInt(F.monthEnd, 10);
                            v += 1
                          )
                            n +=
                              '<div class="xdsoft_option ' +
                              (P.currentTime.getMonth() === v
                                ? "xdsoft_current"
                                : "") +
                              '" data-value="' +
                              v +
                              '">' +
                              F.i18n[o].months[v] +
                              "</div>";
                          L.children().eq(0).html(n),
                            e(z).trigger("generate.xdsoft");
                        }, 10)),
                        t.stopPropagation();
                    })
                    .on("afterOpen.xdsoft", function () {
                      var e, t, a, i;
                      F.timepicker &&
                        ($.find(".xdsoft_current").length
                          ? (e = ".xdsoft_current")
                          : $.find(".xdsoft_init_time").length &&
                            (e = ".xdsoft_init_time"),
                        e
                          ? ((t = H[0].clientHeight),
                            (a = $[0].offsetHeight) - t <
                              (i =
                                $.find(e).index() * F.timeHeightInTimePicker +
                                1) && (i = a - t),
                            H.trigger("scroll_element.xdsoft_scroller", [
                              parseInt(i, 10) / (a - t),
                            ]))
                          : H.trigger("scroll_element.xdsoft_scroller", [0]));
                    }),
                  (l = 0),
                  j.on("touchend click.xdsoft", "td", function (t) {
                    t.stopPropagation(), (l += 1);
                    var i = e(this),
                      n = P.currentTime;
                    if (
                      (null != n ||
                        ((P.currentTime = P.now()), (n = P.currentTime)),
                      i.hasClass("xdsoft_disabled"))
                    )
                      return !1;
                    n.setDate(1),
                      n.setFullYear(i.data("year")),
                      n.setMonth(i.data("month")),
                      n.setDate(i.data("date")),
                      z.trigger("select.xdsoft", [n]),
                      a.val(P.str()),
                      F.onSelectDate &&
                        e.isFunction(F.onSelectDate) &&
                        F.onSelectDate.call(
                          z,
                          P.currentTime,
                          z.data("input"),
                          t
                        ),
                      z.data("changed", !0),
                      z.trigger("xchange.xdsoft"),
                      z.trigger("changedatetime.xdsoft"),
                      (l > 1 ||
                        !0 === F.closeOnDateSelect ||
                        (!1 === F.closeOnDateSelect && !F.timepicker)) &&
                        !F.inline &&
                        z.trigger("close.xdsoft"),
                      setTimeout(function () {
                        l = 0;
                      }, 200);
                  }),
                  $.on("touchstart", "div", function (e) {
                    this.touchMoved = !1;
                  })
                    .on("touchmove", "div", X)
                    .on("touchend click.xdsoft", "div", function (t) {
                      if (!this.touchMoved) {
                        t.stopPropagation();
                        var a = e(this),
                          i = P.currentTime;
                        if (
                          (null != i ||
                            ((P.currentTime = P.now()), (i = P.currentTime)),
                          a.hasClass("xdsoft_disabled"))
                        )
                          return !1;
                        i.setHours(a.data("hour")),
                          i.setMinutes(a.data("minute")),
                          z.trigger("select.xdsoft", [i]),
                          z.data("input").val(P.str()),
                          F.onSelectTime &&
                            e.isFunction(F.onSelectTime) &&
                            F.onSelectTime.call(
                              z,
                              P.currentTime,
                              z.data("input"),
                              t
                            ),
                          z.data("changed", !0),
                          z.trigger("xchange.xdsoft"),
                          z.trigger("changedatetime.xdsoft"),
                          !0 !== F.inline &&
                            !0 === F.closeOnTimeSelect &&
                            z.trigger("close.xdsoft");
                      }
                    }),
                  I.on("mousewheel.xdsoft", function (e) {
                    return (
                      !F.scrollMonth ||
                      (e.deltaY < 0 ? P.nextMonth() : P.prevMonth(), !1)
                    );
                  }),
                  a.on("mousewheel.xdsoft", function (e) {
                    return (
                      !F.scrollInput ||
                      (!F.datepicker && F.timepicker
                        ? ((A = $.find(".xdsoft_current").length
                            ? $.find(".xdsoft_current").eq(0).index()
                            : 0) +
                            e.deltaY >=
                            0 &&
                            A + e.deltaY < $.children().length &&
                            (A += e.deltaY),
                          $.children().eq(A).length &&
                            $.children().eq(A).trigger("mousedown"),
                          !1)
                        : F.datepicker && !F.timepicker
                        ? (I.trigger(e, [e.deltaY, e.deltaX, e.deltaY]),
                          a.val && a.val(P.str()),
                          z.trigger("changedatetime.xdsoft"),
                          !1)
                        : void 0)
                    );
                  }),
                  z
                    .on("changedatetime.xdsoft", function (t) {
                      if (
                        F.onChangeDateTime &&
                        e.isFunction(F.onChangeDateTime)
                      ) {
                        var a = z.data("input");
                        F.onChangeDateTime.call(z, P.currentTime, a, t),
                          delete F.value,
                          a.trigger("change");
                      }
                    })
                    .on("generate.xdsoft", function () {
                      F.onGenerate &&
                        e.isFunction(F.onGenerate) &&
                        F.onGenerate.call(z, P.currentTime, z.data("input")),
                        B && (z.trigger("afterOpen.xdsoft"), (B = !1));
                    })
                    .on("click.xdsoft", function (e) {
                      e.stopPropagation();
                    }),
                  (A = 0),
                  (N = function (e, t) {
                    do {
                      if (!(e = e.parentNode) || !1 === t(e)) break;
                    } while ("HTML" !== e.nodeName);
                  }),
                  (Y = function () {
                    var t, a, i, n, o, r, s, d, l, u, h, c, f;
                    if (
                      ((t = (d = z.data("input")).offset()),
                      (a = d[0]),
                      (u = "top"),
                      (i = t.top + a.offsetHeight - 1),
                      (n = t.left),
                      (o = "absolute"),
                      (l = e(F.contentWindow).width()),
                      (c = e(F.contentWindow).height()),
                      (f = e(F.contentWindow).scrollTop()),
                      F.ownerDocument.documentElement.clientWidth - t.left <
                        I.parent().outerWidth(!0))
                    ) {
                      var m = I.parent().outerWidth(!0) - a.offsetWidth;
                      n -= m;
                    }
                    "rtl" === d.parent().css("direction") &&
                      (n -= z.outerWidth() - d.outerWidth()),
                      F.fixed
                        ? ((i -= f),
                          (n -= e(F.contentWindow).scrollLeft()),
                          (o = "fixed"))
                        : ((s = !1),
                          N(a, function (e) {
                            return (
                              null !== e &&
                              ("fixed" ===
                              F.contentWindow
                                .getComputedStyle(e)
                                .getPropertyValue("position")
                                ? ((s = !0), !1)
                                : void 0)
                            );
                          }),
                          s
                            ? ((o = "fixed"),
                              i + z.outerHeight() > c + f
                                ? ((u = "bottom"), (i = c + f - t.top))
                                : (i -= f))
                            : i + z[0].offsetHeight > c + f &&
                              (i = t.top - z[0].offsetHeight + 1),
                          i < 0 && (i = 0),
                          n + a.offsetWidth > l && (n = l - a.offsetWidth)),
                      (r = z[0]),
                      N(r, function (e) {
                        if (
                          "relative" ===
                            F.contentWindow
                              .getComputedStyle(e)
                              .getPropertyValue("position") &&
                          l >= e.offsetWidth
                        )
                          return (n -= (l - e.offsetWidth) / 2), !1;
                      }),
                      ((h = { position: o, left: n, top: "", bottom: "" })[u] =
                        i),
                      z.css(h);
                  }),
                  z
                    .on("open.xdsoft", function (t) {
                      var a = !0;
                      F.onShow &&
                        e.isFunction(F.onShow) &&
                        (a = F.onShow.call(
                          z,
                          P.currentTime,
                          z.data("input"),
                          t
                        )),
                        !1 !== a &&
                          (z.show(),
                          Y(),
                          e(F.contentWindow)
                            .off("resize.xdsoft", Y)
                            .on("resize.xdsoft", Y),
                          F.closeOnWithoutClick &&
                            e([F.ownerDocument.body, F.contentWindow]).on(
                              "touchstart mousedown.xdsoft",
                              function t() {
                                z.trigger("close.xdsoft"),
                                  e([
                                    F.ownerDocument.body,
                                    F.contentWindow,
                                  ]).off("touchstart mousedown.xdsoft", t);
                              }
                            ));
                    })
                    .on("close.xdsoft", function (t) {
                      var a = !0;
                      V.find(".xdsoft_month,.xdsoft_year")
                        .find(".xdsoft_select")
                        .hide(),
                        F.onClose &&
                          e.isFunction(F.onClose) &&
                          (a = F.onClose.call(
                            z,
                            P.currentTime,
                            z.data("input"),
                            t
                          )),
                        !1 === a || F.opened || F.inline || z.hide(),
                        t.stopPropagation();
                    })
                    .on("toggle.xdsoft", function () {
                      z.is(":visible")
                        ? z.trigger("close.xdsoft")
                        : z.trigger("open.xdsoft");
                    })
                    .data("input", a),
                  (G = 0),
                  z.data("xdsoft_datetime", P),
                  z.setOptions(F),
                  P.setCurrentTime(r()),
                  a
                    .data("xdsoft_datetimepicker", z)
                    .on(
                      "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                      function () {
                        a.is(":disabled") ||
                          (a.data("xdsoft_datetimepicker").is(":visible") &&
                            F.closeOnInputClick) ||
                          (F.openOnFocus &&
                            (clearTimeout(G),
                            (G = setTimeout(function () {
                              a.is(":disabled") ||
                                ((B = !0),
                                P.setCurrentTime(r(), !0),
                                F.mask && s(F),
                                z.trigger("open.xdsoft"));
                            }, 100))));
                      }
                    )
                    .on("keydown.xdsoft", function (t) {
                      var a,
                        i = t.which;
                      return -1 !== [g].indexOf(i) && F.enterLikeTab
                        ? ((a = e(
                            "input:visible,textarea:visible,button:visible,a:visible"
                          )),
                          z.trigger("close.xdsoft"),
                          a.eq(a.index(this) + 1).focus(),
                          !1)
                        : -1 !== [T].indexOf(i)
                        ? (z.trigger("close.xdsoft"), !0)
                        : void 0;
                    })
                    .on("blur.xdsoft", function () {
                      z.trigger("close.xdsoft");
                    });
              }),
              (d = function (t) {
                var a = t.data("xdsoft_datetimepicker");
                a &&
                  (a.data("xdsoft_datetime", null),
                  a.remove(),
                  t.data("xdsoft_datetimepicker", null).off(".xdsoft"),
                  e(F.contentWindow).off("resize.xdsoft"),
                  e([F.contentWindow, F.ownerDocument.body]).off(
                    "mousedown.xdsoft touchstart"
                  ),
                  t.unmousewheel && t.unmousewheel());
              }),
              e(F.ownerDocument)
                .off("keydown.xdsoftctrl keyup.xdsoftctrl")
                .on("keydown.xdsoftctrl", function (e) {
                  e.keyCode === m && (W = !0);
                })
                .on("keyup.xdsoftctrl", function (e) {
                  e.keyCode === m && (W = !1);
                }),
              this.each(function () {
                var t = e(this).data("xdsoft_datetimepicker");
                if (t) {
                  if ("string" === e.type(n))
                    switch (n) {
                      case "show":
                        e(this).select().focus(), t.trigger("open.xdsoft");
                        break;
                      case "hide":
                        t.trigger("close.xdsoft");
                        break;
                      case "toggle":
                        t.trigger("toggle.xdsoft");
                        break;
                      case "destroy":
                        d(e(this));
                        break;
                      case "reset":
                        (this.value = this.defaultValue),
                          (this.value &&
                            t
                              .data("xdsoft_datetime")
                              .isValidDate(
                                i.parseDate(this.value, F.format)
                              )) ||
                            t.data("changed", !1),
                          t.data("xdsoft_datetime").setCurrentTime(this.value);
                        break;
                      case "validate":
                        t.data("input").trigger("blur.xdsoft");
                        break;
                      default:
                        t[n] && e.isFunction(t[n]) && (l = t[n](r));
                    }
                  else t.setOptions(n);
                  return 0;
                }
                "string" !== e.type(n) &&
                  (!F.lazyInit || F.open || F.inline
                    ? s(e(this))
                    : (function (e) {
                        e.on(
                          "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                          function t() {
                            e.is(":disabled") ||
                              e.data("xdsoft_datetimepicker") ||
                              (clearTimeout(A),
                              (A = setTimeout(function () {
                                e.data("xdsoft_datetimepicker") || s(e),
                                  e
                                    .off(
                                      "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                                      t
                                    )
                                    .trigger("open.xdsoft");
                              }, 100)));
                          }
                        );
                      })(e(this)));
              }),
              l
            );
          }),
          (e.fn.datetimepicker.defaults = a);
      }),
        (n = [a("EVdn"), a("si6p")]),
        void 0 === (o = "function" == typeof (i = d) ? i.apply(t, n) : i) ||
          (e.exports = o),
        (n = [a("EVdn")]),
        void 0 ===
          (o =
            "function" ==
            typeof (i = function (e) {
              function t(t) {
                var r = t || window.event,
                  s = d.call(arguments, 1),
                  l = 0,
                  h = 0,
                  c = 0,
                  f = 0,
                  m = 0,
                  p = 0;
                if (
                  (((t = e.event.fix(r)).type = "mousewheel"),
                  "detail" in r && (c = -1 * r.detail),
                  "wheelDelta" in r && (c = r.wheelDelta),
                  "wheelDeltaY" in r && (c = r.wheelDeltaY),
                  "wheelDeltaX" in r && (h = -1 * r.wheelDeltaX),
                  "axis" in r &&
                    r.axis === r.HORIZONTAL_AXIS &&
                    ((h = -1 * c), (c = 0)),
                  (l = 0 === c ? h : c),
                  "deltaY" in r && (l = c = -1 * r.deltaY),
                  "deltaX" in r && ((h = r.deltaX), 0 === c && (l = -1 * h)),
                  0 !== c || 0 !== h)
                ) {
                  if (1 === r.deltaMode) {
                    var g = e.data(this, "mousewheel-line-height");
                    (l *= g), (c *= g), (h *= g);
                  } else if (2 === r.deltaMode) {
                    var v = e.data(this, "mousewheel-page-height");
                    (l *= v), (c *= v), (h *= v);
                  }
                  if (
                    ((f = Math.max(Math.abs(c), Math.abs(h))),
                    (!o || f < o) && ((o = f), i(r, f) && (o /= 40)),
                    i(r, f) && ((l /= 40), (h /= 40), (c /= 40)),
                    (l = Math[l >= 1 ? "floor" : "ceil"](l / o)),
                    (h = Math[h >= 1 ? "floor" : "ceil"](h / o)),
                    (c = Math[c >= 1 ? "floor" : "ceil"](c / o)),
                    u.settings.normalizeOffset && this.getBoundingClientRect)
                  ) {
                    var y = this.getBoundingClientRect();
                    (m = t.clientX - y.left), (p = t.clientY - y.top);
                  }
                  return (
                    (t.deltaX = h),
                    (t.deltaY = c),
                    (t.deltaFactor = o),
                    (t.offsetX = m),
                    (t.offsetY = p),
                    (t.deltaMode = 0),
                    s.unshift(t, l, h, c),
                    n && clearTimeout(n),
                    (n = setTimeout(a, 200)),
                    (e.event.dispatch || e.event.handle).apply(this, s)
                  );
                }
              }
              function a() {
                o = null;
              }
              function i(e, t) {
                return (
                  u.settings.adjustOldDeltas &&
                  "mousewheel" === e.type &&
                  t % 120 == 0
                );
              }
              var n,
                o,
                r = [
                  "wheel",
                  "mousewheel",
                  "DOMMouseScroll",
                  "MozMousePixelScroll",
                ],
                s =
                  "onwheel" in document || document.documentMode >= 9
                    ? ["wheel"]
                    : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                d = Array.prototype.slice;
              if (e.event.fixHooks)
                for (var l = r.length; l; )
                  e.event.fixHooks[r[--l]] = e.event.mouseHooks;
              var u = (e.event.special.mousewheel = {
                version: "3.1.12",
                setup: function () {
                  if (this.addEventListener)
                    for (var a = s.length; a; )
                      this.addEventListener(s[--a], t, !1);
                  else this.onmousewheel = t;
                  e.data(this, "mousewheel-line-height", u.getLineHeight(this)),
                    e.data(
                      this,
                      "mousewheel-page-height",
                      u.getPageHeight(this)
                    );
                },
                teardown: function () {
                  if (this.removeEventListener)
                    for (var a = s.length; a; )
                      this.removeEventListener(s[--a], t, !1);
                  else this.onmousewheel = null;
                  e.removeData(this, "mousewheel-line-height"),
                    e.removeData(this, "mousewheel-page-height");
                },
                getLineHeight: function (t) {
                  var a = e(t),
                    i = a["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                  return (
                    i.length || (i = e("body")),
                    parseInt(i.css("fontSize"), 10) ||
                      parseInt(a.css("fontSize"), 10) ||
                      16
                  );
                },
                getPageHeight: function (t) {
                  return e(t).height();
                },
                settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
              });
              e.fn.extend({
                mousewheel: function (e) {
                  return e
                    ? this.bind("mousewheel", e)
                    : this.trigger("mousewheel");
                },
                unmousewheel: function (e) {
                  return this.unbind("mousewheel", e);
                },
              });
            })
              ? i.apply(t, n)
              : i) || (e.exports = o),
        a("9bdQ"),
        a("brBo"),
        a("Pp04"),
        a("nUVn"),
        a("76gO"),
        a("VMPg"),
        a("VaQ4"),
        a("AcjO"),
        (DATEPICKERS = {}),
        (DATEPICKERS.init = function () {
          $.datetimepicker.setLocale("pl"),
            $('[data-toggle="datepicker"]').each(function () {
              var e = $(this).attr("data-min-date"),
                t = $(this).attr("data-max-date"),
                a = $(this).attr("data-year-start"),
                i = $(this).attr("data-year-end");
              $(this).datetimepicker({
                language: "pl",
                format: "d.m.Y",
                validateOnBlur: !1,
                disableTouchKeyboard: !0,
                timepicker: !1,
                formatDate: "d.m.Y",
                minDate: e,
                maxDate: t,
                yearStart: a,
                yearEnd: i,
                dayOfWeekStart: 1,
              });
            }),
            ($.fn.datepicker.dates.qtrs = {
              days: [
                "Niedziela",
                "Poniedziałek",
                "Wtorek",
                "Środa",
                "Czwartek",
                "Piątek",
                "Sobota",
              ],
              daysShort: [
                "Niedz.",
                "Pon.",
                "Wt.",
                "Śr.",
                "Czw.",
                "Piąt.",
                "Sob.",
              ],
              daysMin: ["Ndz.", "Pn.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
              months: ["1", "2", "3", "4", "", "", "", "", "", "", "", ""],
              monthsShort: [
                "I",
                "II",
                "III",
                "IV",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
              ],
              today: "Dzisiaj",
              weekStart: 1,
              clear: "Wyczyść",
              format: "m.yyyy",
              formatDate: "m.yyyy",
            }),
            $('[data-toggle="quarters-datepicker"]').each(function () {
              var e = $(this).attr("data-min-date"),
                t = $(this).attr("data-max-date");
              $(this)
                .datepicker({
                  format: "m.yyyy",
                  formatDate: "m.yyyy",
                  minViewMode: 1,
                  autoclose: !0,
                  language: "qtrs",
                  orientation: "auto bottom",
                  forceParse: !1,
                  startDate: e,
                  endDate: t,
                })
                .on("show", function (e) {
                  $(".month").each(function (e, t) {
                    e > 3 && $(t).hide();
                  });
                });
            }),
            $('[data-toggle="months-datepicker"]').each(function () {
              var e = $(this).attr("data-min-date"),
                t = $(this).attr("data-max-date");
              $(this).datepicker({
                language: "pl",
                format: "mm.yyyy",
                formatDate: "mm.yyyy",
                validateOnBlur: !1,
                disableTouchKeyboard: !0,
                startView: "months",
                minViewMode: "months",
                startDate: e,
                endDate: t,
              });
            }),
            $('[data-toggle="currency-datepicker"]').each(function () {
              var e = $(this).attr("data-min-date"),
                t = $(this).attr("data-max-date");
              function a(e, t) {
                var a = [];
                $.ajax(
                  "https://wskazniki-api.gofin.pl/exchangerates/tables/" +
                    e.getFullYear() +
                    "/" +
                    (e.getMonth() + 1) +
                    "/availablextended"
                ).done(function (e) {
                  $.each(e, function (e, i) {
                    a.push(i),
                      t.datetimepicker("setOptions", {
                        allowDates: a,
                        formatDate: "d.m.Y",
                      });
                  });
                });
              }
              $(this).datetimepicker({
                language: "pl",
                validateOnBlur: !1,
                disableTouchKeyboard: !0,
                timepicker: !1,
                format: "d.m.Y",
                formatDate: "d.m.Y",
                minDate: e,
                maxDate: t,
                dayOfWeekStart: 1,
                onShow: function (e, t) {
                  a(e, t);
                },
                onChangeMonth: function (e, t) {
                  a(e, t);
                },
              });
            });
        }),
        (POPOVER = {}),
        (POPOVER.init = function () {
          $('[data-toggle="popover"]').popover({
            placement: function () {
              var e = $(window).width();
              return e > 775 ? "right" : e <= 775 ? "bottom" : void 0;
            },
            html: !0,
            container: ".js-calc-form",
          });
        }),
        $(document).ready(function () {
          $("html,body").animate(
            { scrollTop: $(".central-column").offset().top },
            "slow"
          ),
            DATEPICKERS.init(),
            POPOVER.init(),
            $(document).on("click", ".input-calendar", function () {
              $(this)
                .parent()
                .parent()
                .find($('[data-toggle*="datepicker"]'))
                .focus();
            });
        }),
        $(document).ajaxComplete(function () {
          POPOVER.init();
        });
    },
    "76gO": function (e, t, a) {
      var i, n, o;
      /*!
       * Datepicker for Bootstrap v1.9.0 (https://github.com/uxsolutions/bootstrap-datepicker)
       *
       * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
       */ (n = [a("EVdn")]),
        void 0 ===
          (o =
            "function" ==
            typeof (i = function (e, t) {
              function a() {
                return new Date(Date.UTC.apply(Date, arguments));
              }
              function i() {
                var e = new Date();
                return a(e.getFullYear(), e.getMonth(), e.getDate());
              }
              function n(e, t) {
                return (
                  e.getUTCFullYear() === t.getUTCFullYear() &&
                  e.getUTCMonth() === t.getUTCMonth() &&
                  e.getUTCDate() === t.getUTCDate()
                );
              }
              function o(a, i) {
                return function () {
                  return (
                    i !== t && e.fn.datepicker.deprecated(i),
                    this[a].apply(this, arguments)
                  );
                };
              }
              var r,
                s =
                  ((r = {
                    get: function (e) {
                      return this.slice(e)[0];
                    },
                    contains: function (e) {
                      for (
                        var t = e && e.valueOf(), a = 0, i = this.length;
                        a < i;
                        a++
                      )
                        if (
                          0 <= this[a].valueOf() - t &&
                          this[a].valueOf() - t < 864e5
                        )
                          return a;
                      return -1;
                    },
                    remove: function (e) {
                      this.splice(e, 1);
                    },
                    replace: function (t) {
                      t &&
                        (e.isArray(t) || (t = [t]),
                        this.clear(),
                        this.push.apply(this, t));
                    },
                    clear: function () {
                      this.length = 0;
                    },
                    copy: function () {
                      var e = new s();
                      return e.replace(this), e;
                    },
                  }),
                  function () {
                    var t = [];
                    return t.push.apply(t, arguments), e.extend(t, r), t;
                  }),
                d = function (t, a) {
                  e.data(t, "datepicker", this),
                    (this._events = []),
                    (this._secondaryEvents = []),
                    this._process_options(a),
                    (this.dates = new s()),
                    (this.viewDate = this.o.defaultViewDate),
                    (this.focusDate = null),
                    (this.element = e(t)),
                    (this.isInput = this.element.is("input")),
                    (this.inputField = this.isInput
                      ? this.element
                      : this.element.find("input")),
                    (this.component =
                      !!this.element.hasClass("date") &&
                      this.element.find(
                        ".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn"
                      )),
                    this.component &&
                      0 === this.component.length &&
                      (this.component = !1),
                    (this.isInline = !this.component && this.element.is("div")),
                    (this.picker = e(p.template)),
                    this._check_template(this.o.templates.leftArrow) &&
                      this.picker
                        .find(".prev")
                        .html(this.o.templates.leftArrow),
                    this._check_template(this.o.templates.rightArrow) &&
                      this.picker
                        .find(".next")
                        .html(this.o.templates.rightArrow),
                    this._buildEvents(),
                    this._attachEvents(),
                    this.isInline
                      ? this.picker
                          .addClass("datepicker-inline")
                          .appendTo(this.element)
                      : this.picker.addClass(
                          "datepicker-dropdown dropdown-menu"
                        ),
                    this.o.rtl && this.picker.addClass("datepicker-rtl"),
                    this.o.calendarWeeks &&
                      this.picker
                        .find(
                          ".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear"
                        )
                        .attr("colspan", function (e, t) {
                          return Number(t) + 1;
                        }),
                    this._process_options({
                      startDate: this._o.startDate,
                      endDate: this._o.endDate,
                      daysOfWeekDisabled: this.o.daysOfWeekDisabled,
                      daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
                      datesDisabled: this.o.datesDisabled,
                    }),
                    (this._allow_update = !1),
                    this.setViewMode(this.o.startView),
                    (this._allow_update = !0),
                    this.fillDow(),
                    this.fillMonths(),
                    this.update(),
                    this.isInline && this.show();
                };
              d.prototype = {
                constructor: d,
                _resolveViewName: function (t) {
                  return (
                    e.each(p.viewModes, function (a, i) {
                      if (t === a || -1 !== e.inArray(t, i.names))
                        return (t = a), !1;
                    }),
                    t
                  );
                },
                _resolveDaysOfWeek: function (t) {
                  return (
                    e.isArray(t) || (t = t.split(/[,\s]*/)), e.map(t, Number)
                  );
                },
                _check_template: function (a) {
                  try {
                    if (a === t || "" === a) return !1;
                    if ((a.match(/[<>]/g) || []).length <= 0) return !0;
                    var i = e(a);
                    return i.length > 0;
                  } catch (e) {
                    return !1;
                  }
                },
                _process_options: function (t) {
                  this._o = e.extend({}, this._o, t);
                  var n = (this.o = e.extend({}, this._o)),
                    o = n.language;
                  m[o] || ((o = o.split("-")[0]), m[o] || (o = c.language)),
                    (n.language = o),
                    (n.startView = this._resolveViewName(n.startView)),
                    (n.minViewMode = this._resolveViewName(n.minViewMode)),
                    (n.maxViewMode = this._resolveViewName(n.maxViewMode)),
                    (n.startView = Math.max(
                      this.o.minViewMode,
                      Math.min(this.o.maxViewMode, n.startView)
                    )),
                    !0 !== n.multidate &&
                      ((n.multidate = Number(n.multidate) || !1),
                      !1 !== n.multidate &&
                        (n.multidate = Math.max(0, n.multidate))),
                    (n.multidateSeparator = String(n.multidateSeparator)),
                    (n.weekStart %= 7),
                    (n.weekEnd = (n.weekStart + 6) % 7);
                  var r = p.parseFormat(n.format);
                  n.startDate !== -1 / 0 &&
                    (n.startDate
                      ? n.startDate instanceof Date
                        ? (n.startDate = this._local_to_utc(
                            this._zero_time(n.startDate)
                          ))
                        : (n.startDate = p.parseDate(
                            n.startDate,
                            r,
                            n.language,
                            n.assumeNearbyYear
                          ))
                      : (n.startDate = -1 / 0)),
                    n.endDate !== 1 / 0 &&
                      (n.endDate
                        ? n.endDate instanceof Date
                          ? (n.endDate = this._local_to_utc(
                              this._zero_time(n.endDate)
                            ))
                          : (n.endDate = p.parseDate(
                              n.endDate,
                              r,
                              n.language,
                              n.assumeNearbyYear
                            ))
                        : (n.endDate = 1 / 0)),
                    (n.daysOfWeekDisabled = this._resolveDaysOfWeek(
                      n.daysOfWeekDisabled || []
                    )),
                    (n.daysOfWeekHighlighted = this._resolveDaysOfWeek(
                      n.daysOfWeekHighlighted || []
                    )),
                    (n.datesDisabled = n.datesDisabled || []),
                    e.isArray(n.datesDisabled) ||
                      (n.datesDisabled = n.datesDisabled.split(",")),
                    (n.datesDisabled = e.map(n.datesDisabled, function (e) {
                      return p.parseDate(e, r, n.language, n.assumeNearbyYear);
                    }));
                  var s = String(n.orientation).toLowerCase().split(/\s+/g),
                    d = n.orientation.toLowerCase();
                  if (
                    ((s = e.grep(s, function (e) {
                      return /^auto|left|right|top|bottom$/.test(e);
                    })),
                    (n.orientation = { x: "auto", y: "auto" }),
                    d && "auto" !== d)
                  )
                    if (1 === s.length)
                      switch (s[0]) {
                        case "top":
                        case "bottom":
                          n.orientation.y = s[0];
                          break;
                        case "left":
                        case "right":
                          n.orientation.x = s[0];
                      }
                    else
                      (d = e.grep(s, function (e) {
                        return /^left|right$/.test(e);
                      })),
                        (n.orientation.x = d[0] || "auto"),
                        (d = e.grep(s, function (e) {
                          return /^top|bottom$/.test(e);
                        })),
                        (n.orientation.y = d[0] || "auto");
                  if (
                    n.defaultViewDate instanceof Date ||
                    "string" == typeof n.defaultViewDate
                  )
                    n.defaultViewDate = p.parseDate(
                      n.defaultViewDate,
                      r,
                      n.language,
                      n.assumeNearbyYear
                    );
                  else if (n.defaultViewDate) {
                    var l = n.defaultViewDate.year || new Date().getFullYear(),
                      u = n.defaultViewDate.month || 0,
                      h = n.defaultViewDate.day || 1;
                    n.defaultViewDate = a(l, u, h);
                  } else n.defaultViewDate = i();
                },
                _applyEvents: function (e) {
                  for (var a, i, n, o = 0; o < e.length; o++)
                    (a = e[o][0]),
                      2 === e[o].length
                        ? ((i = t), (n = e[o][1]))
                        : 3 === e[o].length && ((i = e[o][1]), (n = e[o][2])),
                      a.on(n, i);
                },
                _unapplyEvents: function (e) {
                  for (var a, i, n, o = 0; o < e.length; o++)
                    (a = e[o][0]),
                      2 === e[o].length
                        ? ((n = t), (i = e[o][1]))
                        : 3 === e[o].length && ((n = e[o][1]), (i = e[o][2])),
                      a.off(i, n);
                },
                _buildEvents: function () {
                  var t = {
                    keyup: e.proxy(function (t) {
                      -1 ===
                        e.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) &&
                        this.update();
                    }, this),
                    keydown: e.proxy(this.keydown, this),
                    paste: e.proxy(this.paste, this),
                  };
                  !0 === this.o.showOnFocus &&
                    (t.focus = e.proxy(this.show, this)),
                    this.isInput
                      ? (this._events = [[this.element, t]])
                      : this.component && this.inputField.length
                      ? (this._events = [
                          [this.inputField, t],
                          [this.component, { click: e.proxy(this.show, this) }],
                        ])
                      : (this._events = [
                          [
                            this.element,
                            {
                              click: e.proxy(this.show, this),
                              keydown: e.proxy(this.keydown, this),
                            },
                          ],
                        ]),
                    this._events.push(
                      [
                        this.element,
                        "*",
                        {
                          blur: e.proxy(function (e) {
                            this._focused_from = e.target;
                          }, this),
                        },
                      ],
                      [
                        this.element,
                        {
                          blur: e.proxy(function (e) {
                            this._focused_from = e.target;
                          }, this),
                        },
                      ]
                    ),
                    this.o.immediateUpdates &&
                      this._events.push([
                        this.element,
                        {
                          "changeYear changeMonth": e.proxy(function (e) {
                            this.update(e.date);
                          }, this),
                        },
                      ]),
                    (this._secondaryEvents = [
                      [this.picker, { click: e.proxy(this.click, this) }],
                      [
                        this.picker,
                        ".prev, .next",
                        { click: e.proxy(this.navArrowsClick, this) },
                      ],
                      [
                        this.picker,
                        ".day:not(.disabled)",
                        { click: e.proxy(this.dayCellClick, this) },
                      ],
                      [e(window), { resize: e.proxy(this.place, this) }],
                      [
                        e(document),
                        {
                          "mousedown touchstart": e.proxy(function (e) {
                            this.element.is(e.target) ||
                              this.element.find(e.target).length ||
                              this.picker.is(e.target) ||
                              this.picker.find(e.target).length ||
                              this.isInline ||
                              this.hide();
                          }, this),
                        },
                      ],
                    ]);
                },
                _attachEvents: function () {
                  this._detachEvents(), this._applyEvents(this._events);
                },
                _detachEvents: function () {
                  this._unapplyEvents(this._events);
                },
                _attachSecondaryEvents: function () {
                  this._detachSecondaryEvents(),
                    this._applyEvents(this._secondaryEvents);
                },
                _detachSecondaryEvents: function () {
                  this._unapplyEvents(this._secondaryEvents);
                },
                _trigger: function (t, a) {
                  var i = a || this.dates.get(-1),
                    n = this._utc_to_local(i);
                  this.element.trigger({
                    type: t,
                    date: n,
                    viewMode: this.viewMode,
                    dates: e.map(this.dates, this._utc_to_local),
                    format: e.proxy(function (e, t) {
                      0 === arguments.length
                        ? ((e = this.dates.length - 1), (t = this.o.format))
                        : "string" == typeof e &&
                          ((t = e), (e = this.dates.length - 1)),
                        (t = t || this.o.format);
                      var a = this.dates.get(e);
                      return p.formatDate(a, t, this.o.language);
                    }, this),
                  });
                },
                show: function () {
                  if (
                    !(
                      this.inputField.is(":disabled") ||
                      (this.inputField.prop("readonly") &&
                        !1 === this.o.enableOnReadonly)
                    )
                  )
                    return (
                      this.isInline || this.picker.appendTo(this.o.container),
                      this.place(),
                      this.picker.show(),
                      this._attachSecondaryEvents(),
                      this._trigger("show"),
                      (window.navigator.msMaxTouchPoints ||
                        "ontouchstart" in document) &&
                        this.o.disableTouchKeyboard &&
                        e(this.element).blur(),
                      this
                    );
                },
                hide: function () {
                  return this.isInline || !this.picker.is(":visible")
                    ? this
                    : ((this.focusDate = null),
                      this.picker.hide().detach(),
                      this._detachSecondaryEvents(),
                      this.setViewMode(this.o.startView),
                      this.o.forceParse &&
                        this.inputField.val() &&
                        this.setValue(),
                      this._trigger("hide"),
                      this);
                },
                destroy: function () {
                  return (
                    this.hide(),
                    this._detachEvents(),
                    this._detachSecondaryEvents(),
                    this.picker.remove(),
                    delete this.element.data().datepicker,
                    this.isInput || delete this.element.data().date,
                    this
                  );
                },
                paste: function (t) {
                  var a;
                  if (
                    t.originalEvent.clipboardData &&
                    t.originalEvent.clipboardData.types &&
                    -1 !==
                      e.inArray(
                        "text/plain",
                        t.originalEvent.clipboardData.types
                      )
                  )
                    a = t.originalEvent.clipboardData.getData("text/plain");
                  else {
                    if (!window.clipboardData) return;
                    a = window.clipboardData.getData("Text");
                  }
                  this.setDate(a), this.update(), t.preventDefault();
                },
                _utc_to_local: function (e) {
                  if (!e) return e;
                  var t = new Date(e.getTime() + 6e4 * e.getTimezoneOffset());
                  return (
                    t.getTimezoneOffset() !== e.getTimezoneOffset() &&
                      (t = new Date(e.getTime() + 6e4 * t.getTimezoneOffset())),
                    t
                  );
                },
                _local_to_utc: function (e) {
                  return (
                    e && new Date(e.getTime() - 6e4 * e.getTimezoneOffset())
                  );
                },
                _zero_time: function (e) {
                  return (
                    e && new Date(e.getFullYear(), e.getMonth(), e.getDate())
                  );
                },
                _zero_utc_time: function (e) {
                  return (
                    e && a(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
                  );
                },
                getDates: function () {
                  return e.map(this.dates, this._utc_to_local);
                },
                getUTCDates: function () {
                  return e.map(this.dates, function (e) {
                    return new Date(e);
                  });
                },
                getDate: function () {
                  return this._utc_to_local(this.getUTCDate());
                },
                getUTCDate: function () {
                  var e = this.dates.get(-1);
                  return e !== t ? new Date(e) : null;
                },
                clearDates: function () {
                  this.inputField.val(""),
                    this.update(),
                    this._trigger("changeDate"),
                    this.o.autoclose && this.hide();
                },
                setDates: function () {
                  var t = e.isArray(arguments[0]) ? arguments[0] : arguments;
                  return (
                    this.update.apply(this, t),
                    this._trigger("changeDate"),
                    this.setValue(),
                    this
                  );
                },
                setUTCDates: function () {
                  var t = e.isArray(arguments[0]) ? arguments[0] : arguments;
                  return (
                    this.setDates.apply(this, e.map(t, this._utc_to_local)),
                    this
                  );
                },
                setDate: o("setDates"),
                setUTCDate: o("setUTCDates"),
                remove: o(
                  "destroy",
                  "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"
                ),
                setValue: function () {
                  var e = this.getFormattedDate();
                  return this.inputField.val(e), this;
                },
                getFormattedDate: function (a) {
                  a === t && (a = this.o.format);
                  var i = this.o.language;
                  return e
                    .map(this.dates, function (e) {
                      return p.formatDate(e, a, i);
                    })
                    .join(this.o.multidateSeparator);
                },
                getStartDate: function () {
                  return this.o.startDate;
                },
                setStartDate: function (e) {
                  return (
                    this._process_options({ startDate: e }),
                    this.update(),
                    this.updateNavArrows(),
                    this
                  );
                },
                getEndDate: function () {
                  return this.o.endDate;
                },
                setEndDate: function (e) {
                  return (
                    this._process_options({ endDate: e }),
                    this.update(),
                    this.updateNavArrows(),
                    this
                  );
                },
                setDaysOfWeekDisabled: function (e) {
                  return (
                    this._process_options({ daysOfWeekDisabled: e }),
                    this.update(),
                    this
                  );
                },
                setDaysOfWeekHighlighted: function (e) {
                  return (
                    this._process_options({ daysOfWeekHighlighted: e }),
                    this.update(),
                    this
                  );
                },
                setDatesDisabled: function (e) {
                  return (
                    this._process_options({ datesDisabled: e }),
                    this.update(),
                    this
                  );
                },
                place: function () {
                  if (this.isInline) return this;
                  var t = this.picker.outerWidth(),
                    a = this.picker.outerHeight(),
                    i = e(this.o.container),
                    n = i.width(),
                    o =
                      "body" === this.o.container
                        ? e(document).scrollTop()
                        : i.scrollTop(),
                    r = i.offset(),
                    s = [0];
                  this.element.parents().each(function () {
                    var t = e(this).css("z-index");
                    "auto" !== t && 0 !== Number(t) && s.push(Number(t));
                  });
                  var d = Math.max.apply(Math, s) + this.o.zIndexOffset,
                    l = this.component
                      ? this.component.parent().offset()
                      : this.element.offset(),
                    u = this.component
                      ? this.component.outerHeight(!0)
                      : this.element.outerHeight(!1),
                    h = this.component
                      ? this.component.outerWidth(!0)
                      : this.element.outerWidth(!1),
                    c = l.left - r.left,
                    f = l.top - r.top;
                  "body" !== this.o.container && (f += o),
                    this.picker.removeClass(
                      "datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"
                    ),
                    "auto" !== this.o.orientation.x
                      ? (this.picker.addClass(
                          "datepicker-orient-" + this.o.orientation.x
                        ),
                        "right" === this.o.orientation.x && (c -= t - h))
                      : l.left < 0
                      ? (this.picker.addClass("datepicker-orient-left"),
                        (c -= l.left - 10))
                      : c + t > n
                      ? (this.picker.addClass("datepicker-orient-right"),
                        (c += h - t))
                      : this.o.rtl
                      ? this.picker.addClass("datepicker-orient-right")
                      : this.picker.addClass("datepicker-orient-left");
                  var m = this.o.orientation.y;
                  if (
                    ("auto" === m && (m = -o + f - a < 0 ? "bottom" : "top"),
                    this.picker.addClass("datepicker-orient-" + m),
                    "top" === m
                      ? (f -= a + parseInt(this.picker.css("padding-top")))
                      : (f += u),
                    this.o.rtl)
                  ) {
                    var p = n - (c + h);
                    this.picker.css({ top: f, right: p, zIndex: d });
                  } else this.picker.css({ top: f, left: c, zIndex: d });
                  return this;
                },
                _allow_update: !0,
                update: function () {
                  if (!this._allow_update) return this;
                  var t = this.dates.copy(),
                    a = [],
                    i = !1;
                  return (
                    arguments.length
                      ? (e.each(
                          arguments,
                          e.proxy(function (e, t) {
                            t instanceof Date && (t = this._local_to_utc(t)),
                              a.push(t);
                          }, this)
                        ),
                        (i = !0))
                      : ((a =
                          (a = this.isInput
                            ? this.element.val()
                            : this.element.data("date") ||
                              this.inputField.val()) && this.o.multidate
                            ? a.split(this.o.multidateSeparator)
                            : [a]),
                        delete this.element.data().date),
                    (a = e.map(
                      a,
                      e.proxy(function (e) {
                        return p.parseDate(
                          e,
                          this.o.format,
                          this.o.language,
                          this.o.assumeNearbyYear
                        );
                      }, this)
                    )),
                    (a = e.grep(
                      a,
                      e.proxy(function (e) {
                        return !this.dateWithinRange(e) || !e;
                      }, this),
                      !0
                    )),
                    this.dates.replace(a),
                    this.o.updateViewDate &&
                      (this.dates.length
                        ? (this.viewDate = new Date(this.dates.get(-1)))
                        : this.viewDate < this.o.startDate
                        ? (this.viewDate = new Date(this.o.startDate))
                        : this.viewDate > this.o.endDate
                        ? (this.viewDate = new Date(this.o.endDate))
                        : (this.viewDate = this.o.defaultViewDate)),
                    i
                      ? (this.setValue(), this.element.change())
                      : this.dates.length &&
                        String(t) !== String(this.dates) &&
                        i &&
                        (this._trigger("changeDate"), this.element.change()),
                    !this.dates.length &&
                      t.length &&
                      (this._trigger("clearDate"), this.element.change()),
                    this.fill(),
                    this
                  );
                },
                fillDow: function () {
                  if (this.o.showWeekDays) {
                    var t = this.o.weekStart,
                      a = "<tr>";
                    for (
                      this.o.calendarWeeks &&
                      (a += '<th class="cw">&#160;</th>');
                      t < this.o.weekStart + 7;

                    )
                      (a += '<th class="dow'),
                        -1 !== e.inArray(t, this.o.daysOfWeekDisabled) &&
                          (a += " disabled"),
                        (a +=
                          '">' + m[this.o.language].daysMin[t++ % 7] + "</th>");
                    (a += "</tr>"),
                      this.picker.find(".datepicker-days thead").append(a);
                  }
                },
                fillMonths: function () {
                  for (
                    var e, t = this._utc_to_local(this.viewDate), a = "", i = 0;
                    i < 12;
                    i++
                  )
                    (e = t && t.getMonth() === i ? " focused" : ""),
                      (a +=
                        '<span class="month' +
                        e +
                        '">' +
                        m[this.o.language].monthsShort[i] +
                        "</span>");
                  this.picker.find(".datepicker-months td").html(a);
                },
                setRange: function (t) {
                  t && t.length
                    ? (this.range = e.map(t, function (e) {
                        return e.valueOf();
                      }))
                    : delete this.range,
                    this.fill();
                },
                getClassNames: function (t) {
                  var a = [],
                    o = this.viewDate.getUTCFullYear(),
                    r = this.viewDate.getUTCMonth(),
                    s = i();
                  return (
                    t.getUTCFullYear() < o ||
                    (t.getUTCFullYear() === o && t.getUTCMonth() < r)
                      ? a.push("old")
                      : (t.getUTCFullYear() > o ||
                          (t.getUTCFullYear() === o && t.getUTCMonth() > r)) &&
                        a.push("new"),
                    this.focusDate &&
                      t.valueOf() === this.focusDate.valueOf() &&
                      a.push("focused"),
                    this.o.todayHighlight && n(t, s) && a.push("today"),
                    -1 !== this.dates.contains(t) && a.push("active"),
                    this.dateWithinRange(t) || a.push("disabled"),
                    this.dateIsDisabled(t) &&
                      a.push("disabled", "disabled-date"),
                    -1 !==
                      e.inArray(t.getUTCDay(), this.o.daysOfWeekHighlighted) &&
                      a.push("highlighted"),
                    this.range &&
                      (t > this.range[0] &&
                        t < this.range[this.range.length - 1] &&
                        a.push("range"),
                      -1 !== e.inArray(t.valueOf(), this.range) &&
                        a.push("selected"),
                      t.valueOf() === this.range[0] && a.push("range-start"),
                      t.valueOf() === this.range[this.range.length - 1] &&
                        a.push("range-end")),
                    a
                  );
                },
                _fill_yearsView: function (a, i, n, o, r, s, d) {
                  for (
                    var l,
                      u,
                      h,
                      c = "",
                      f = n / 10,
                      m = this.picker.find(a),
                      p = Math.floor(o / n) * n,
                      g = p + 9 * f,
                      v = Math.floor(this.viewDate.getFullYear() / f) * f,
                      y = e.map(this.dates, function (e) {
                        return Math.floor(e.getUTCFullYear() / f) * f;
                      }),
                      D = p - f;
                    D <= g + f;
                    D += f
                  )
                    (l = [i]),
                      (u = null),
                      D === p - f
                        ? l.push("old")
                        : D === g + f && l.push("new"),
                      -1 !== e.inArray(D, y) && l.push("active"),
                      (D < r || D > s) && l.push("disabled"),
                      D === v && l.push("focused"),
                      d !== e.noop &&
                        ((h = d(new Date(D, 0, 1))) === t
                          ? (h = {})
                          : "boolean" == typeof h
                          ? (h = { enabled: h })
                          : "string" == typeof h && (h = { classes: h }),
                        !1 === h.enabled && l.push("disabled"),
                        h.classes && (l = l.concat(h.classes.split(/\s+/))),
                        h.tooltip && (u = h.tooltip)),
                      (c +=
                        '<span class="' +
                        l.join(" ") +
                        '"' +
                        (u ? ' title="' + u + '"' : "") +
                        ">" +
                        D +
                        "</span>");
                  m.find(".datepicker-switch").text(p + "-" + g),
                    m.find("td").html(c);
                },
                fill: function () {
                  var n,
                    o,
                    r = new Date(this.viewDate),
                    s = r.getUTCFullYear(),
                    d = r.getUTCMonth(),
                    l =
                      this.o.startDate !== -1 / 0
                        ? this.o.startDate.getUTCFullYear()
                        : -1 / 0,
                    u =
                      this.o.startDate !== -1 / 0
                        ? this.o.startDate.getUTCMonth()
                        : -1 / 0,
                    h =
                      this.o.endDate !== 1 / 0
                        ? this.o.endDate.getUTCFullYear()
                        : 1 / 0,
                    c =
                      this.o.endDate !== 1 / 0
                        ? this.o.endDate.getUTCMonth()
                        : 1 / 0,
                    f = m[this.o.language].today || m.en.today || "",
                    g = m[this.o.language].clear || m.en.clear || "",
                    v = m[this.o.language].titleFormat || m.en.titleFormat,
                    y = i(),
                    D =
                      (!0 === this.o.todayBtn ||
                        "linked" === this.o.todayBtn) &&
                      y >= this.o.startDate &&
                      y <= this.o.endDate &&
                      !this.weekOfDateIsDisabled(y);
                  if (!isNaN(s) && !isNaN(d)) {
                    this.picker
                      .find(".datepicker-days .datepicker-switch")
                      .text(p.formatDate(r, v, this.o.language)),
                      this.picker
                        .find("tfoot .today")
                        .text(f)
                        .css("display", D ? "table-cell" : "none"),
                      this.picker
                        .find("tfoot .clear")
                        .text(g)
                        .css(
                          "display",
                          !0 === this.o.clearBtn ? "table-cell" : "none"
                        ),
                      this.picker
                        .find("thead .datepicker-title")
                        .text(this.o.title)
                        .css(
                          "display",
                          "string" == typeof this.o.title && "" !== this.o.title
                            ? "table-cell"
                            : "none"
                        ),
                      this.updateNavArrows(),
                      this.fillMonths();
                    var k = a(s, d, 0),
                      w = k.getUTCDate();
                    k.setUTCDate(
                      w - ((k.getUTCDay() - this.o.weekStart + 7) % 7)
                    );
                    var b = new Date(k);
                    k.getUTCFullYear() < 100 &&
                      b.setUTCFullYear(k.getUTCFullYear()),
                      b.setUTCDate(b.getUTCDate() + 42),
                      (b = b.valueOf());
                    for (var T, x, M = []; k.valueOf() < b; ) {
                      if (
                        (T = k.getUTCDay()) === this.o.weekStart &&
                        (M.push("<tr>"), this.o.calendarWeeks)
                      ) {
                        var S = new Date(
                            +k + ((this.o.weekStart - T - 7) % 7) * 864e5
                          ),
                          _ = new Date(
                            Number(S) + ((11 - S.getUTCDay()) % 7) * 864e5
                          ),
                          O = new Date(
                            Number((O = a(_.getUTCFullYear(), 0, 1))) +
                              ((11 - O.getUTCDay()) % 7) * 864e5
                          ),
                          C = (_ - O) / 864e5 / 7 + 1;
                        M.push('<td class="cw">' + C + "</td>");
                      }
                      (x = this.getClassNames(k)).push("day");
                      var W = k.getUTCDate();
                      this.o.beforeShowDay !== e.noop &&
                        ((o = this.o.beforeShowDay(this._utc_to_local(k))) === t
                          ? (o = {})
                          : "boolean" == typeof o
                          ? (o = { enabled: o })
                          : "string" == typeof o && (o = { classes: o }),
                        !1 === o.enabled && x.push("disabled"),
                        o.classes && (x = x.concat(o.classes.split(/\s+/))),
                        o.tooltip && (n = o.tooltip),
                        o.content && (W = o.content)),
                        (x = e.isFunction(e.uniqueSort)
                          ? e.uniqueSort(x)
                          : e.unique(x)),
                        M.push(
                          '<td class="' +
                            x.join(" ") +
                            '"' +
                            (n ? ' title="' + n + '"' : "") +
                            ' data-date="' +
                            k.getTime().toString() +
                            '">' +
                            W +
                            "</td>"
                        ),
                        (n = null),
                        T === this.o.weekEnd && M.push("</tr>"),
                        k.setUTCDate(k.getUTCDate() + 1);
                    }
                    this.picker.find(".datepicker-days tbody").html(M.join(""));
                    var F =
                        m[this.o.language].monthsTitle ||
                        m.en.monthsTitle ||
                        "Months",
                      A = this.picker
                        .find(".datepicker-months")
                        .find(".datepicker-switch")
                        .text(this.o.maxViewMode < 2 ? F : s)
                        .end()
                        .find("tbody span")
                        .removeClass("active");
                    if (
                      (e.each(this.dates, function (e, t) {
                        t.getUTCFullYear() === s &&
                          A.eq(t.getUTCMonth()).addClass("active");
                      }),
                      (s < l || s > h) && A.addClass("disabled"),
                      s === l && A.slice(0, u).addClass("disabled"),
                      s === h && A.slice(c + 1).addClass("disabled"),
                      this.o.beforeShowMonth !== e.noop)
                    ) {
                      var Y = this;
                      e.each(A, function (a, i) {
                        var n = new Date(s, a, 1),
                          o = Y.o.beforeShowMonth(n);
                        o === t
                          ? (o = {})
                          : "boolean" == typeof o
                          ? (o = { enabled: o })
                          : "string" == typeof o && (o = { classes: o }),
                          !1 !== o.enabled ||
                            e(i).hasClass("disabled") ||
                            e(i).addClass("disabled"),
                          o.classes && e(i).addClass(o.classes),
                          o.tooltip && e(i).prop("title", o.tooltip);
                      });
                    }
                    this._fill_yearsView(
                      ".datepicker-years",
                      "year",
                      10,
                      s,
                      l,
                      h,
                      this.o.beforeShowYear
                    ),
                      this._fill_yearsView(
                        ".datepicker-decades",
                        "decade",
                        100,
                        s,
                        l,
                        h,
                        this.o.beforeShowDecade
                      ),
                      this._fill_yearsView(
                        ".datepicker-centuries",
                        "century",
                        1e3,
                        s,
                        l,
                        h,
                        this.o.beforeShowCentury
                      );
                  }
                },
                updateNavArrows: function () {
                  if (this._allow_update) {
                    var e,
                      t,
                      a = new Date(this.viewDate),
                      i = a.getUTCFullYear(),
                      n = a.getUTCMonth(),
                      o =
                        this.o.startDate !== -1 / 0
                          ? this.o.startDate.getUTCFullYear()
                          : -1 / 0,
                      r =
                        this.o.startDate !== -1 / 0
                          ? this.o.startDate.getUTCMonth()
                          : -1 / 0,
                      s =
                        this.o.endDate !== 1 / 0
                          ? this.o.endDate.getUTCFullYear()
                          : 1 / 0,
                      d =
                        this.o.endDate !== 1 / 0
                          ? this.o.endDate.getUTCMonth()
                          : 1 / 0,
                      l = 1;
                    switch (this.viewMode) {
                      case 4:
                        l *= 10;
                      case 3:
                        l *= 10;
                      case 2:
                        l *= 10;
                      case 1:
                        (e = Math.floor(i / l) * l <= o),
                          (t = Math.floor(i / l) * l + l > s);
                        break;
                      case 0:
                        (e = i <= o && n <= r), (t = i >= s && n >= d);
                    }
                    this.picker.find(".prev").toggleClass("disabled", e),
                      this.picker.find(".next").toggleClass("disabled", t);
                  }
                },
                click: function (t) {
                  var n, o, r;
                  t.preventDefault(),
                    t.stopPropagation(),
                    (n = e(t.target)).hasClass("datepicker-switch") &&
                      this.viewMode !== this.o.maxViewMode &&
                      this.setViewMode(this.viewMode + 1),
                    n.hasClass("today") &&
                      !n.hasClass("day") &&
                      (this.setViewMode(0),
                      this._setDate(
                        i(),
                        "linked" === this.o.todayBtn ? null : "view"
                      )),
                    n.hasClass("clear") && this.clearDates(),
                    n.hasClass("disabled") ||
                      ((n.hasClass("month") ||
                        n.hasClass("year") ||
                        n.hasClass("decade") ||
                        n.hasClass("century")) &&
                        (this.viewDate.setUTCDate(1),
                        1 === this.viewMode
                          ? ((r = n.parent().find("span").index(n)),
                            (o = this.viewDate.getUTCFullYear()),
                            this.viewDate.setUTCMonth(r))
                          : ((r = 0),
                            (o = Number(n.text())),
                            this.viewDate.setUTCFullYear(o)),
                        this._trigger(
                          p.viewModes[this.viewMode - 1].e,
                          this.viewDate
                        ),
                        this.viewMode === this.o.minViewMode
                          ? this._setDate(a(o, r, 1))
                          : (this.setViewMode(this.viewMode - 1),
                            this.fill()))),
                    this.picker.is(":visible") &&
                      this._focused_from &&
                      this._focused_from.focus(),
                    delete this._focused_from;
                },
                dayCellClick: function (t) {
                  var a = e(t.currentTarget),
                    i = a.data("date"),
                    n = new Date(i);
                  this.o.updateViewDate &&
                    (n.getUTCFullYear() !== this.viewDate.getUTCFullYear() &&
                      this._trigger("changeYear", this.viewDate),
                    n.getUTCMonth() !== this.viewDate.getUTCMonth() &&
                      this._trigger("changeMonth", this.viewDate)),
                    this._setDate(n);
                },
                navArrowsClick: function (t) {
                  var a = e(t.currentTarget),
                    i = a.hasClass("prev") ? -1 : 1;
                  0 !== this.viewMode &&
                    (i *= 12 * p.viewModes[this.viewMode].navStep),
                    (this.viewDate = this.moveMonth(this.viewDate, i)),
                    this._trigger(p.viewModes[this.viewMode].e, this.viewDate),
                    this.fill();
                },
                _toggle_multidate: function (e) {
                  var t = this.dates.contains(e);
                  if (
                    (e || this.dates.clear(),
                    -1 !== t
                      ? (!0 === this.o.multidate ||
                          this.o.multidate > 1 ||
                          this.o.toggleActive) &&
                        this.dates.remove(t)
                      : !1 === this.o.multidate
                      ? (this.dates.clear(), this.dates.push(e))
                      : this.dates.push(e),
                    "number" == typeof this.o.multidate)
                  )
                    for (; this.dates.length > this.o.multidate; )
                      this.dates.remove(0);
                },
                _setDate: function (e, t) {
                  (t && "date" !== t) ||
                    this._toggle_multidate(e && new Date(e)),
                    ((!t && this.o.updateViewDate) || "view" === t) &&
                      (this.viewDate = e && new Date(e)),
                    this.fill(),
                    this.setValue(),
                    (t && "view" === t) || this._trigger("changeDate"),
                    this.inputField.trigger("change"),
                    !this.o.autoclose || (t && "date" !== t) || this.hide();
                },
                moveDay: function (e, t) {
                  var a = new Date(e);
                  return a.setUTCDate(e.getUTCDate() + t), a;
                },
                moveWeek: function (e, t) {
                  return this.moveDay(e, 7 * t);
                },
                moveMonth: function (e, t) {
                  if (!(a = e) || isNaN(a.getTime()))
                    return this.o.defaultViewDate;
                  var a;
                  if (!t) return e;
                  var i,
                    n,
                    o = new Date(e.valueOf()),
                    r = o.getUTCDate(),
                    s = o.getUTCMonth(),
                    d = Math.abs(t);
                  if (((t = t > 0 ? 1 : -1), 1 === d))
                    (n =
                      -1 === t
                        ? function () {
                            return o.getUTCMonth() === s;
                          }
                        : function () {
                            return o.getUTCMonth() !== i;
                          }),
                      (i = s + t),
                      o.setUTCMonth(i),
                      (i = (i + 12) % 12);
                  else {
                    for (var l = 0; l < d; l++) o = this.moveMonth(o, t);
                    (i = o.getUTCMonth()),
                      o.setUTCDate(r),
                      (n = function () {
                        return i !== o.getUTCMonth();
                      });
                  }
                  for (; n(); ) o.setUTCDate(--r), o.setUTCMonth(i);
                  return o;
                },
                moveYear: function (e, t) {
                  return this.moveMonth(e, 12 * t);
                },
                moveAvailableDate: function (e, t, a) {
                  do {
                    if (((e = this[a](e, t)), !this.dateWithinRange(e)))
                      return !1;
                    a = "moveDay";
                  } while (this.dateIsDisabled(e));
                  return e;
                },
                weekOfDateIsDisabled: function (t) {
                  return (
                    -1 !== e.inArray(t.getUTCDay(), this.o.daysOfWeekDisabled)
                  );
                },
                dateIsDisabled: function (t) {
                  return (
                    this.weekOfDateIsDisabled(t) ||
                    e.grep(this.o.datesDisabled, function (e) {
                      return n(t, e);
                    }).length > 0
                  );
                },
                dateWithinRange: function (e) {
                  return e >= this.o.startDate && e <= this.o.endDate;
                },
                keydown: function (e) {
                  if (this.picker.is(":visible")) {
                    var t,
                      a,
                      i = !1,
                      n = this.focusDate || this.viewDate;
                    switch (e.keyCode) {
                      case 27:
                        this.focusDate
                          ? ((this.focusDate = null),
                            (this.viewDate =
                              this.dates.get(-1) || this.viewDate),
                            this.fill())
                          : this.hide(),
                          e.preventDefault(),
                          e.stopPropagation();
                        break;
                      case 37:
                      case 38:
                      case 39:
                      case 40:
                        if (
                          !this.o.keyboardNavigation ||
                          7 === this.o.daysOfWeekDisabled.length
                        )
                          break;
                        (t = 37 === e.keyCode || 38 === e.keyCode ? -1 : 1),
                          0 === this.viewMode
                            ? e.ctrlKey
                              ? (a = this.moveAvailableDate(
                                  n,
                                  t,
                                  "moveYear"
                                )) && this._trigger("changeYear", this.viewDate)
                              : e.shiftKey
                              ? (a = this.moveAvailableDate(
                                  n,
                                  t,
                                  "moveMonth"
                                )) &&
                                this._trigger("changeMonth", this.viewDate)
                              : 37 === e.keyCode || 39 === e.keyCode
                              ? (a = this.moveAvailableDate(n, t, "moveDay"))
                              : this.weekOfDateIsDisabled(n) ||
                                (a = this.moveAvailableDate(n, t, "moveWeek"))
                            : 1 === this.viewMode
                            ? ((38 !== e.keyCode && 40 !== e.keyCode) ||
                                (t *= 4),
                              (a = this.moveAvailableDate(n, t, "moveMonth")))
                            : 2 === this.viewMode &&
                              ((38 !== e.keyCode && 40 !== e.keyCode) ||
                                (t *= 4),
                              (a = this.moveAvailableDate(n, t, "moveYear"))),
                          a &&
                            ((this.focusDate = this.viewDate = a),
                            this.setValue(),
                            this.fill(),
                            e.preventDefault());
                        break;
                      case 13:
                        if (!this.o.forceParse) break;
                        (n =
                          this.focusDate ||
                          this.dates.get(-1) ||
                          this.viewDate),
                          this.o.keyboardNavigation &&
                            (this._toggle_multidate(n), (i = !0)),
                          (this.focusDate = null),
                          (this.viewDate = this.dates.get(-1) || this.viewDate),
                          this.setValue(),
                          this.fill(),
                          this.picker.is(":visible") &&
                            (e.preventDefault(),
                            e.stopPropagation(),
                            this.o.autoclose && this.hide());
                        break;
                      case 9:
                        (this.focusDate = null),
                          (this.viewDate = this.dates.get(-1) || this.viewDate),
                          this.fill(),
                          this.hide();
                    }
                    i &&
                      (this.dates.length
                        ? this._trigger("changeDate")
                        : this._trigger("clearDate"),
                      this.inputField.trigger("change"));
                  } else
                    (40 !== e.keyCode && 27 !== e.keyCode) ||
                      (this.show(), e.stopPropagation());
                },
                setViewMode: function (e) {
                  (this.viewMode = e),
                    this.picker
                      .children("div")
                      .hide()
                      .filter(
                        ".datepicker-" + p.viewModes[this.viewMode].clsName
                      )
                      .show(),
                    this.updateNavArrows(),
                    this._trigger("changeViewMode", new Date(this.viewDate));
                },
              };
              var l = function (t, a) {
                e.data(t, "datepicker", this),
                  (this.element = e(t)),
                  (this.inputs = e.map(a.inputs, function (e) {
                    return e.jquery ? e[0] : e;
                  })),
                  delete a.inputs,
                  (this.keepEmptyValues = a.keepEmptyValues),
                  delete a.keepEmptyValues,
                  h
                    .call(e(this.inputs), a)
                    .on("changeDate", e.proxy(this.dateUpdated, this)),
                  (this.pickers = e.map(this.inputs, function (t) {
                    return e.data(t, "datepicker");
                  })),
                  this.updateDates();
              };
              l.prototype = {
                updateDates: function () {
                  (this.dates = e.map(this.pickers, function (e) {
                    return e.getUTCDate();
                  })),
                    this.updateRanges();
                },
                updateRanges: function () {
                  var t = e.map(this.dates, function (e) {
                    return e.valueOf();
                  });
                  e.each(this.pickers, function (e, a) {
                    a.setRange(t);
                  });
                },
                clearDates: function () {
                  e.each(this.pickers, function (e, t) {
                    t.clearDates();
                  });
                },
                dateUpdated: function (a) {
                  if (!this.updating) {
                    this.updating = !0;
                    var i = e.data(a.target, "datepicker");
                    if (i !== t) {
                      var n = i.getUTCDate(),
                        o = this.keepEmptyValues,
                        r = e.inArray(a.target, this.inputs),
                        s = r - 1,
                        d = r + 1,
                        l = this.inputs.length;
                      if (-1 !== r) {
                        if (
                          (e.each(this.pickers, function (e, t) {
                            t.getUTCDate() || (t !== i && o) || t.setUTCDate(n);
                          }),
                          n < this.dates[s])
                        )
                          for (; s >= 0 && n < this.dates[s]; )
                            this.pickers[s--].setUTCDate(n);
                        else if (n > this.dates[d])
                          for (; d < l && n > this.dates[d]; )
                            this.pickers[d++].setUTCDate(n);
                        this.updateDates(), delete this.updating;
                      }
                    }
                  }
                },
                destroy: function () {
                  e.map(this.pickers, function (e) {
                    e.destroy();
                  }),
                    e(this.inputs).off("changeDate", this.dateUpdated),
                    delete this.element.data().datepicker;
                },
                remove: o(
                  "destroy",
                  "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"
                ),
              };
              var u = e.fn.datepicker,
                h = function (a) {
                  var i,
                    n = Array.apply(null, arguments);
                  if (
                    (n.shift(),
                    this.each(function () {
                      var t = e(this),
                        o = t.data("datepicker"),
                        r = "object" == typeof a && a;
                      if (!o) {
                        var s = (function (t, a) {
                            var i,
                              n = e(t).data(),
                              o = {},
                              r = new RegExp("^" + a.toLowerCase() + "([A-Z])");
                            function s(e, t) {
                              return t.toLowerCase();
                            }
                            for (var d in ((a = new RegExp(
                              "^" + a.toLowerCase()
                            )),
                            n))
                              a.test(d) &&
                                ((i = d.replace(r, s)), (o[i] = n[d]));
                            return o;
                          })(this, "date"),
                          u = e.extend({}, c, s, r),
                          h = (function (t) {
                            var a = {};
                            if (m[t] || ((t = t.split("-")[0]), m[t])) {
                              var i = m[t];
                              return (
                                e.each(f, function (e, t) {
                                  t in i && (a[t] = i[t]);
                                }),
                                a
                              );
                            }
                          })(u.language),
                          p = e.extend({}, c, h, s, r);
                        t.hasClass("input-daterange") || p.inputs
                          ? (e.extend(p, {
                              inputs: p.inputs || t.find("input").toArray(),
                            }),
                            (o = new l(this, p)))
                          : (o = new d(this, p)),
                          t.data("datepicker", o);
                      }
                      "string" == typeof a &&
                        "function" == typeof o[a] &&
                        (i = o[a].apply(o, n));
                    }),
                    i === t || i instanceof d || i instanceof l)
                  )
                    return this;
                  if (this.length > 1)
                    throw new Error(
                      "Using only allowed for the collection of a single element (" +
                        a +
                        " function)"
                    );
                  return i;
                };
              e.fn.datepicker = h;
              var c = (e.fn.datepicker.defaults = {
                  assumeNearbyYear: !1,
                  autoclose: !1,
                  beforeShowDay: e.noop,
                  beforeShowMonth: e.noop,
                  beforeShowYear: e.noop,
                  beforeShowDecade: e.noop,
                  beforeShowCentury: e.noop,
                  calendarWeeks: !1,
                  clearBtn: !1,
                  toggleActive: !1,
                  daysOfWeekDisabled: [],
                  daysOfWeekHighlighted: [],
                  datesDisabled: [],
                  endDate: 1 / 0,
                  forceParse: !0,
                  format: "mm/dd/yyyy",
                  keepEmptyValues: !1,
                  keyboardNavigation: !0,
                  language: "en",
                  minViewMode: 0,
                  maxViewMode: 4,
                  multidate: !1,
                  multidateSeparator: ",",
                  orientation: "auto",
                  rtl: !1,
                  startDate: -1 / 0,
                  startView: 0,
                  todayBtn: !1,
                  todayHighlight: !1,
                  updateViewDate: !0,
                  weekStart: 0,
                  disableTouchKeyboard: !1,
                  enableOnReadonly: !0,
                  showOnFocus: !0,
                  zIndexOffset: 10,
                  container: "body",
                  immediateUpdates: !1,
                  title: "",
                  templates: { leftArrow: "&#x00AB;", rightArrow: "&#x00BB;" },
                  showWeekDays: !0,
                }),
                f = (e.fn.datepicker.locale_opts = [
                  "format",
                  "rtl",
                  "weekStart",
                ]);
              e.fn.datepicker.Constructor = d;
              var m = (e.fn.datepicker.dates = {
                  en: {
                    days: [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    daysShort: [
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    months: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ],
                    monthsShort: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    today: "Today",
                    clear: "Clear",
                    titleFormat: "MM yyyy",
                  },
                }),
                p = {
                  viewModes: [
                    {
                      names: ["days", "month"],
                      clsName: "days",
                      e: "changeMonth",
                    },
                    {
                      names: ["months", "year"],
                      clsName: "months",
                      e: "changeYear",
                      navStep: 1,
                    },
                    {
                      names: ["years", "decade"],
                      clsName: "years",
                      e: "changeDecade",
                      navStep: 10,
                    },
                    {
                      names: ["decades", "century"],
                      clsName: "decades",
                      e: "changeCentury",
                      navStep: 100,
                    },
                    {
                      names: ["centuries", "millennium"],
                      clsName: "centuries",
                      e: "changeMillennium",
                      navStep: 1e3,
                    },
                  ],
                  validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                  nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
                  parseFormat: function (e) {
                    if (
                      "function" == typeof e.toValue &&
                      "function" == typeof e.toDisplay
                    )
                      return e;
                    var t = e.replace(this.validParts, "\0").split("\0"),
                      a = e.match(this.validParts);
                    if (!t || !t.length || !a || 0 === a.length)
                      throw new Error("Invalid date format.");
                    return { separators: t, parts: a };
                  },
                  parseDate: function (a, n, o, r) {
                    if (!a) return t;
                    if (a instanceof Date) return a;
                    if (
                      ("string" == typeof n && (n = p.parseFormat(n)),
                      n.toValue)
                    )
                      return n.toValue(a, n, o);
                    var s,
                      l,
                      u,
                      h,
                      c,
                      f = {
                        d: "moveDay",
                        m: "moveMonth",
                        w: "moveWeek",
                        y: "moveYear",
                      },
                      g = { yesterday: "-1d", today: "+0d", tomorrow: "+1d" };
                    if (
                      (a in g && (a = g[a]),
                      /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(a))
                    ) {
                      for (
                        s = a.match(/([\-+]\d+)([dmwy])/gi),
                          a = new Date(),
                          h = 0;
                        h < s.length;
                        h++
                      )
                        (l = s[h].match(/([\-+]\d+)([dmwy])/i)),
                          (u = Number(l[1])),
                          (c = f[l[2].toLowerCase()]),
                          (a = d.prototype[c](a, u));
                      return d.prototype._zero_utc_time(a);
                    }
                    s = (a && a.match(this.nonpunctuation)) || [];
                    var v,
                      y,
                      D = {},
                      k = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                      w = {
                        yyyy: function (e, t) {
                          return e.setUTCFullYear(
                            r
                              ? (!0 === (i = r) && (i = 10),
                                (a = t) < 100 &&
                                  (a += 2e3) > new Date().getFullYear() + i &&
                                  (a -= 100),
                                a)
                              : t
                          );
                          var a, i;
                        },
                        m: function (e, t) {
                          if (isNaN(e)) return e;
                          for (t -= 1; t < 0; ) t += 12;
                          for (
                            t %= 12, e.setUTCMonth(t);
                            e.getUTCMonth() !== t;

                          )
                            e.setUTCDate(e.getUTCDate() - 1);
                          return e;
                        },
                        d: function (e, t) {
                          return e.setUTCDate(t);
                        },
                      };
                    (w.yy = w.yyyy),
                      (w.M = w.MM = w.mm = w.m),
                      (w.dd = w.d),
                      (a = i());
                    var b = n.parts.slice();
                    function T() {
                      var e = this.slice(0, s[h].length),
                        t = s[h].slice(0, e.length);
                      return e.toLowerCase() === t.toLowerCase();
                    }
                    if (
                      (s.length !== b.length &&
                        (b = e(b)
                          .filter(function (t, a) {
                            return -1 !== e.inArray(a, k);
                          })
                          .toArray()),
                      s.length === b.length)
                    ) {
                      var x, M, S;
                      for (h = 0, x = b.length; h < x; h++) {
                        if (((v = parseInt(s[h], 10)), (l = b[h]), isNaN(v)))
                          switch (l) {
                            case "MM":
                              (y = e(m[o].months).filter(T)),
                                (v = e.inArray(y[0], m[o].months) + 1);
                              break;
                            case "M":
                              (y = e(m[o].monthsShort).filter(T)),
                                (v = e.inArray(y[0], m[o].monthsShort) + 1);
                          }
                        D[l] = v;
                      }
                      for (h = 0; h < k.length; h++)
                        (S = k[h]) in D &&
                          !isNaN(D[S]) &&
                          ((M = new Date(a)),
                          w[S](M, D[S]),
                          isNaN(M) || (a = M));
                    }
                    return a;
                  },
                  formatDate: function (t, a, i) {
                    if (!t) return "";
                    if (
                      ("string" == typeof a && (a = p.parseFormat(a)),
                      a.toDisplay)
                    )
                      return a.toDisplay(t, a, i);
                    var n = {
                      d: t.getUTCDate(),
                      D: m[i].daysShort[t.getUTCDay()],
                      DD: m[i].days[t.getUTCDay()],
                      m: t.getUTCMonth() + 1,
                      M: m[i].monthsShort[t.getUTCMonth()],
                      MM: m[i].months[t.getUTCMonth()],
                      yy: t.getUTCFullYear().toString().substring(2),
                      yyyy: t.getUTCFullYear(),
                    };
                    (n.dd = (n.d < 10 ? "0" : "") + n.d),
                      (n.mm = (n.m < 10 ? "0" : "") + n.m),
                      (t = []);
                    for (
                      var o = e.extend([], a.separators),
                        r = 0,
                        s = a.parts.length;
                      r <= s;
                      r++
                    )
                      o.length && t.push(o.shift()), t.push(n[a.parts[r]]);
                    return t.join("");
                  },
                  headTemplate:
                    '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' +
                    c.templates.leftArrow +
                    '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' +
                    c.templates.rightArrow +
                    "</th></tr></thead>",
                  contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                  footTemplate:
                    '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>',
                };
              (p.template =
                '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' +
                p.headTemplate +
                "<tbody></tbody>" +
                p.footTemplate +
                '</table></div><div class="datepicker-months"><table class="table-condensed">' +
                p.headTemplate +
                p.contTemplate +
                p.footTemplate +
                '</table></div><div class="datepicker-years"><table class="table-condensed">' +
                p.headTemplate +
                p.contTemplate +
                p.footTemplate +
                '</table></div><div class="datepicker-decades"><table class="table-condensed">' +
                p.headTemplate +
                p.contTemplate +
                p.footTemplate +
                '</table></div><div class="datepicker-centuries"><table class="table-condensed">' +
                p.headTemplate +
                p.contTemplate +
                p.footTemplate +
                "</table></div></div>"),
                (e.fn.datepicker.DPGlobal = p),
                (e.fn.datepicker.noConflict = function () {
                  return (e.fn.datepicker = u), this;
                }),
                (e.fn.datepicker.version = "1.9.0"),
                (e.fn.datepicker.deprecated = function (e) {
                  var t = window.console;
                  t && t.warn && t.warn("DEPRECATED: " + e);
                }),
                e(document).on(
                  "focus.datepicker.data-api click.datepicker.data-api",
                  '[data-provide="datepicker"]',
                  function (t) {
                    var a = e(this);
                    a.data("datepicker") ||
                      (t.preventDefault(), h.call(a, "show"));
                  }
                ),
                e(function () {
                  h.call(e('[data-provide="datepicker-inline"]'));
                });
            })
              ? i.apply(t, n)
              : i) || (e.exports = o);
    },
    "9bdQ": function (e, t, a) {
      "use strict";
      !(function (e, t) {
        (e.AJAX = function (e) {
          (this.$wrapper = e),
            this.$wrapper.on(
              "change",
              "input, select",
              this.ajaxRequest.bind(this)
            ),
            t(this._selectors.formSectionToggler).on(
              "click",
              this.toggleSection
            );
        }),
          t.extend(e.AJAX.prototype, {
            _selectors: {
              newForm: ".js-calc-form",
              submitButton: "#calculate",
              formSectionToggler: ".form-section-toggler",
            },
            ajaxRequest: function () {
              var e = this;
              t.fn.serializeObject = function () {
                var e = {},
                  a = this.serializeArray();
                t.each(a, function () {
                  void 0 !== e[this.name]
                    ? (e[this.name].push || (e[this.name] = [e[this.name]]),
                      e[this.name].push(this.value || ""))
                    : (e[this.name] = this.value || "");
                });
                var i = t(
                  "input[type=radio],input[type=checkbox], input[type=hidden]",
                  this
                );
                return (
                  t.each(i, function () {
                    e.hasOwnProperty(this.name) || (e[this.name] = "");
                  }),
                  e
                );
              };
              var a = t(e._selectors.newForm).serializeObject();
              t.ajax({
                url: e.$wrapper.attr("action"),
                method: e.$wrapper.attr("method"),
                data: a,
                success: function (t) {
                  e._removeFormErrors(),
                    e._removeDynamicInputs(JSON.parse(t.fieldsToRemove)),
                    e._mapDynamicInputs(t.extraFields),
                    e._mapFootnotes(t.footnotes);
                },
                error: function (t) {
                  var a = JSON.parse(t.responseText);
                  e._mapErrorsToForm(a.errors);
                },
              });
            },
            _mapErrorsToForm: function (e) {
              this._removeFormErrors(),
                this.$wrapper.find(":input").each(function () {
                  var a = t(this).attr("id"),
                    i = t(this).closest(".input-row");
                  if (e[a]) {
                    var n = t(
                      "<span class='invalid-feedback d-block text-right'> <span class='d-block'> <span class='form-error-message'>" +
                        e[a] +
                        "</span> </span></span>"
                    );
                    n.html(),
                      t(this).addClass("is-invalid"),
                      (i = t(this).closest(".input-row")).has(
                        ".invalid-feedback"
                      ).length || i.append(n);
                  }
                });
            },
            _removeFormErrors: function () {
              var e = this.$wrapper;
              e.find(".invalid-feedback").remove(),
                e.find("input").removeClass("is-invalid");
            },
            _mapDynamicInputs: function (e) {
              var a = this.$wrapper;
              t.each(e, function (e, i) {
                var n = t(i)
                  .find("[data-localizator]")
                  .attr("data-localizator");
                void 0 !== n
                  ? a
                      .find(
                        "input[name=" +
                          n +
                          "], textarea[name=" +
                          n +
                          "], select[name=" +
                          n +
                          "]"
                      )
                      .closest(".form-group")
                      .after(i)
                  : a
                      .find("input:last")
                      .closest(".form-group")
                      .parent()
                      .append(i);
              }),
                DATEPICKERS.init();
            },
            _removeDynamicInputs: function (e) {
              var a = this.$wrapper;
              t.each(e, function (e, t) {
                a.find("#" + e)
                  .closest(".form-group")
                  .fadeOut()
                  .remove();
              });
            },
            _mapFootnotes: function (e) {
              t("#footnotes-container").replaceWith(e);
            },
            toggleSection: function () {
              t(this).parent().parent().find(".form-section").slideToggle(),
                t(this)
                  .find("i")
                  .toggleClass("icon-g-strzalka3-dol icon-g-strzalka3-gora");
              var e = new Map();
              e.set("zwiń", "rozwiń"),
                e.set("dodaj", "usuń"),
                e.set("pokaż", "ukryj");
              var a,
                i = t(this).find("span"),
                n = i.text().toLowerCase(),
                o = !1,
                r = "";
              e.forEach(function (e, t) {
                !0 !== o &&
                  (-1 !== n.indexOf(e)
                    ? ((o = !0), (r = t), (a = e))
                    : -1 !== n.indexOf(t) && ((o = !0), (r = e), (a = t)));
              }),
                o &&
                  (t("[data-toggle='popover']").popover("hide"),
                  t(this).find("span").html(i.html().replace(a, r)),
                  POPOVER.init());
            },
          });
      })(window, jQuery),
        $(document).ready(function () {
          var e = $(".js-calc-form");
          new AJAX(e);
          $(".add-input-form").each(function () {
            var e = !1;
            $(this)
              .find("input")
              .each(function () {
                $(this).val() && (e = !0);
              }),
              e &&
                ($(this).show(),
                $(this).parent().prev().find("span:contains(dodaj)").length >=
                  1 &&
                  ($(this)
                    .parent()
                    .prev()
                    .find("span")
                    .html(
                      $(this)
                        .parent()
                        .prev()
                        .find("span")
                        .html()
                        .replace("+ dodaj", "- usuń")
                    ),
                  POPOVER.init()));
          }),
            $(".form-section").each(function () {
              var e = !1;
              $(this)
                .find("input, select")
                .each(function () {
                  $(this).val() && (e = !0);
                }),
                e && $(this).addClass("form-expanded");
            });
        });
    },
    AcjO: function (e, t, a) {
      "use strict";
      !(function (e, t) {
        (e.VALIDATION = function (e) {
          (this.$wrapper = e),
            this.$wrapper.on(
              "keypress",
              ".numeric-input",
              this.numericOnly.bind(this)
            ),
            this.$wrapper.on(
              "keypress",
              ".block-minus",
              this.blockMinus.bind(this)
            ),
            this.$wrapper.on(
              "keypress",
              ".block-next-minus",
              this.blockNextMinus.bind(this)
            ),
            this.$wrapper.on(
              "keypress",
              ".block-dot",
              this.blockDot.bind(this)
            ),
            this.$wrapper.on(
              "keypress",
              ".block-comma",
              this.blockComma.bind(this)
            ),
            this.$wrapper.on(
              "keypress",
              ".block-next-dot-comma",
              this.blockNextDotComma.bind(this)
            ),
            this.$wrapper.on(
              "keypress",
              ".precision",
              this.precision.bind(this)
            ),
            this.$wrapper.on(
              "focusout",
              ".auto-money-format",
              this.autoMoneyFormat.bind(this)
            );
        }),
          t.extend(e.VALIDATION.prototype, {
            _selectors: {
              newForm: ".js-calc-form",
              submitButton: "#calculate",
              formSectionToggler: ".form-section-toggler",
            },
            blockDot: function (e) {
              "." === e.key && e.preventDefault();
            },
            blockComma: function (e) {
              "," === e.key && e.preventDefault();
            },
            blockMinus: function (e) {
              "-" === e.key && e.preventDefault();
            },
            blockNextMinus: function (e) {
              "-" !== e.key ||
                (0 === e.target.selectionStart &&
                  -1 === e.target.value.indexOf("-")) ||
                e.preventDefault();
            },
            blockNextDotComma: function (e) {
              if (("." === e.key && (e.key = ","), "," === e.key)) {
                e.preventDefault();
                var t = e.target.value;
                -1 === t.indexOf(",") &&
                  -1 === t.indexOf(".") &&
                  0 !== t.length &&
                  (e.target.value += ",");
              }
            },
            autoMoneyFormat: function (e) {
              if ("" !== e.currentTarget.value) {
                var t = e.currentTarget.value.replace(/[,+]/g, ".");
                e.currentTarget.value = Number(t)
                  .toFixed(2)
                  .replace(/[.+]/g, ",");
              }
            },
            numericOnly: function (e) {
              (44 > e.charCode || e.charCode > 58 || 47 === e.charCode) &&
                e.preventDefault();
            },
            precision: function (e) {
              var a = e.currentTarget.value,
                i = parseInt(t(e.currentTarget).attr("data-precision"));
              Number.isNaN(i) && (i = 2);
              var n = a.indexOf("."),
                o = a.indexOf(",");
              ((-1 !== n && a.length > n + i) ||
                (-1 !== o && a.length > o + i) ||
                (0 === i && (-1 !== n || -1 !== o))) &&
                e.currentTarget.selectionEnd > o &&
                e.currentTarget.selectionStart ===
                  e.currentTarget.selectionEnd &&
                e.preventDefault();
            },
          });
      })(window, jQuery),
        $(document).ready(function () {
          var e = $(".js-gofin-validate");
          new VALIDATION(e);
        });
    },
    Pp04: function (e, t) {
      (VALIDATION = {}),
        (VALIDATION.submit_clicked = !1),
        document.addEventListener(
          "invalid",
          function (e) {
            e.preventDefault(),
              $("input:invalid:not(.is-invalid)").each(function () {
                $(this).addClass("is-invalid"),
                  ($row = $(this).closest(".input-row")),
                  $row.has(".form-error-container").length ||
                    ($(this).closest(".input-row").append(a),
                    $("html,body").animate(
                      {
                        scrollTop: $(".invalid-feedback")
                          .parent()
                          .prev()
                          .offset().top,
                      },
                      "slow"
                    ));
              });
          },
          !0
        ),
        document.addEventListener(
          "submit",
          function (e) {
            $(e.target).hasClass("js-calc-form") &&
              $(".js-calc-form").find(".invalid-feedback").length &&
              (e.preventDefault(),
              $("html,body").animate(
                {
                  scrollTop: $(".invalid-feedback").parent().prev().offset()
                    .top,
                },
                "slow"
              ));
          },
          !0
        );
      var a =
        "<div class='mb-2 order-last col-24 text-right p-0 form-error-container'> <span class='invalid-feedback d-block'> <span class='d-block'> <span class='form-error-message'>Proszę wypełnić to pole</span> </span></span> </div>";
    },
    VMPg: function (e, t) {
      jQuery.fn.datepicker.dates.pl = {
        days: [
          "Niedziela",
          "Poniedziałek",
          "Wtorek",
          "Środa",
          "Czwartek",
          "Piątek",
          "Sobota",
        ],
        daysShort: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Piąt.", "Sob."],
        daysMin: ["Ndz.", "Pn.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
        months: [
          "Styczeń",
          "Luty",
          "Marzec",
          "Kwiecień",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "Sierpień",
          "Wrzesień",
          "Październik",
          "Listopad",
          "Grudzień",
        ],
        monthsShort: [
          "Sty.",
          "Lut.",
          "Mar.",
          "Kwi.",
          "Maj",
          "Cze.",
          "Lip.",
          "Sie.",
          "Wrz.",
          "Paź.",
          "Lis.",
          "Gru.",
        ],
        today: "Dzisiaj",
        weekStart: 1,
        clear: "Wyczyść",
        format: "dd.mm.yyyy",
      };
    },
    VaQ4: function (e, t) {
      $(document).ready(function () {
        $(".result-table div .form-section-toggler").click(function () {
          $(this).parent().parent().find(".table-toggled").toggle();
        });
      });
    },
    brBo: function (e, t) {
      $(document).ready(function () {
        var e = 200 - $(".description-type").val().length;
        $("#chars-counter").text(e),
          $(document).on("keyup", ".description-type", function () {
            var e = 200 - this.value.length;
            $("#chars-counter").text(e);
          });
      });
    },
    nUVn: function (e, t, a) {
      "use strict";
      var i = 1;
      !(function (e, t) {
        (e.Collection = function (e) {
          (this.wrapper = e),
            this.activateButtons(),
            this.wrapper.on(
              "click",
              this._selectors.addButton,
              this.cloneFields.bind(this)
            ),
            this.wrapper.on(
              "click",
              this._selectors.deleteButton,
              this.deleteField.bind(this)
            );
        }),
          t.extend(e.Collection.prototype, {
            _selectors: {
              addButton: '[data-button-type="add"]',
              deleteButton: '[data-button-type="delete"]',
              collectionHolder: ".data-collection-holder",
            },
            cloneFields: function (e) {
              var a = this.wrapper.children().first(),
                n = a.attr("data-collection-limit") || 100,
                o = a.children();
              if (o.length < n) {
                i = o.length + 1;
                var r = a.attr("data-prototype").replace(/__name__/g, i);
                i > 1 && (r = r.replace("color-gray", "")),
                  t(a).append(r),
                  DATEPICKERS.init(),
                  this.activateButtons(),
                  i++;
              }
            },
            reindexCollection: function (e) {
              if (e.length) {
                var a = this.wrapper.find("div[data-prototype]").attr("id"),
                  n = e.find('[id^="' + a + '_"]'),
                  o = e.find(".collection-count-holder");
                (i = parseInt(o.attr("data-child-index")) - 1),
                  o.attr("data-child-index", i),
                  o.text(i + ".");
                var r = /\[\d+]/gm;
                n.each(function () {
                  var e = t(this)
                    .attr("name")
                    .replace(r, "[" + i + "]");
                  t(this).attr("name", e);
                }),
                  i++,
                  this.reindexCollection(e.next());
              }
            },
            deleteField: function (e) {
              var a = t(e.target).parent().parent().parent();
              a.parent().children().length > 1 &&
                (this.reindexCollection(a.next()),
                a.remove(),
                this.activateButtons(),
                i--);
            },
            activateButtons: function () {
              var e = this.wrapper.find(this._selectors.addButton),
                t = this.wrapper.find(this._selectors.deleteButton),
                a = this.wrapper.find(this._selectors.collectionHolder),
                i = a.attr("data-collection-limit") || 100,
                n = a.children().length;
              n <= 1
                ? (t.addClass("color-gray"), e.removeClass("color-gray"))
                : n >= i
                ? (t.removeClass("color-gray"), e.addClass("color-gray"))
                : (e.removeClass("color-gray"), t.removeClass("color-gray"));
            },
          });
      })(window, jQuery),
        $(document).ready(function () {
          var e = $("[data-form-type='collection-form']");
          new Collection(e);
        });
    },
    si6p: function (e, t, a) {
      var i, n, o;
      /*!
       * jQuery Mousewheel 3.1.13
       *
       * Copyright jQuery Foundation and other contributors
       * Released under the MIT license
       * http://jquery.org/license
       */ (n = [a("EVdn")]),
        void 0 ===
          (o =
            "function" ==
            typeof (i = function (e) {
              var t,
                a,
                i = [
                  "wheel",
                  "mousewheel",
                  "DOMMouseScroll",
                  "MozMousePixelScroll",
                ],
                n =
                  "onwheel" in document || document.documentMode >= 9
                    ? ["wheel"]
                    : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                o = Array.prototype.slice;
              if (e.event.fixHooks)
                for (var r = i.length; r; )
                  e.event.fixHooks[i[--r]] = e.event.mouseHooks;
              var s = (e.event.special.mousewheel = {
                version: "3.1.12",
                setup: function () {
                  if (this.addEventListener)
                    for (var t = n.length; t; )
                      this.addEventListener(n[--t], d, !1);
                  else this.onmousewheel = d;
                  e.data(this, "mousewheel-line-height", s.getLineHeight(this)),
                    e.data(
                      this,
                      "mousewheel-page-height",
                      s.getPageHeight(this)
                    );
                },
                teardown: function () {
                  if (this.removeEventListener)
                    for (var t = n.length; t; )
                      this.removeEventListener(n[--t], d, !1);
                  else this.onmousewheel = null;
                  e.removeData(this, "mousewheel-line-height"),
                    e.removeData(this, "mousewheel-page-height");
                },
                getLineHeight: function (t) {
                  var a = e(t),
                    i = a["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                  return (
                    i.length || (i = e("body")),
                    parseInt(i.css("fontSize"), 10) ||
                      parseInt(a.css("fontSize"), 10) ||
                      16
                  );
                },
                getPageHeight: function (t) {
                  return e(t).height();
                },
                settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
              });
              function d(i) {
                var n = i || window.event,
                  r = o.call(arguments, 1),
                  d = 0,
                  h = 0,
                  c = 0,
                  f = 0,
                  m = 0,
                  p = 0;
                if (
                  (((i = e.event.fix(n)).type = "mousewheel"),
                  "detail" in n && (c = -1 * n.detail),
                  "wheelDelta" in n && (c = n.wheelDelta),
                  "wheelDeltaY" in n && (c = n.wheelDeltaY),
                  "wheelDeltaX" in n && (h = -1 * n.wheelDeltaX),
                  "axis" in n &&
                    n.axis === n.HORIZONTAL_AXIS &&
                    ((h = -1 * c), (c = 0)),
                  (d = 0 === c ? h : c),
                  "deltaY" in n && ((c = -1 * n.deltaY), (d = c)),
                  "deltaX" in n && ((h = n.deltaX), 0 === c && (d = -1 * h)),
                  0 !== c || 0 !== h)
                ) {
                  if (1 === n.deltaMode) {
                    var g = e.data(this, "mousewheel-line-height");
                    (d *= g), (c *= g), (h *= g);
                  } else if (2 === n.deltaMode) {
                    var v = e.data(this, "mousewheel-page-height");
                    (d *= v), (c *= v), (h *= v);
                  }
                  if (
                    ((f = Math.max(Math.abs(c), Math.abs(h))),
                    (!a || f < a) && ((a = f), u(n, f) && (a /= 40)),
                    u(n, f) && ((d /= 40), (h /= 40), (c /= 40)),
                    (d = Math[d >= 1 ? "floor" : "ceil"](d / a)),
                    (h = Math[h >= 1 ? "floor" : "ceil"](h / a)),
                    (c = Math[c >= 1 ? "floor" : "ceil"](c / a)),
                    s.settings.normalizeOffset && this.getBoundingClientRect)
                  ) {
                    var y = this.getBoundingClientRect();
                    (m = i.clientX - y.left), (p = i.clientY - y.top);
                  }
                  return (
                    (i.deltaX = h),
                    (i.deltaY = c),
                    (i.deltaFactor = a),
                    (i.offsetX = m),
                    (i.offsetY = p),
                    (i.deltaMode = 0),
                    r.unshift(i, d, h, c),
                    t && clearTimeout(t),
                    (t = setTimeout(l, 200)),
                    (e.event.dispatch || e.event.handle).apply(this, r)
                  );
                }
              }
              function l() {
                a = null;
              }
              function u(e, t) {
                return (
                  s.settings.adjustOldDeltas &&
                  "mousewheel" === e.type &&
                  t % 120 == 0
                );
              }
              e.fn.extend({
                mousewheel: function (e) {
                  return e
                    ? this.bind("mousewheel", e)
                    : this.trigger("mousewheel");
                },
                unmousewheel: function (e) {
                  return this.unbind("mousewheel", e);
                },
              });
            })
              ? i.apply(t, n)
              : i) || (e.exports = o);
    },
  },
  [["/ky/", "runtime", "js/librarires"]],
]);
