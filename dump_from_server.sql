COPY public.blank (id, user_1, user_2, user_3, user_4, match_id, owner_id) FROM stdin;
\.


--
-- Data for Name: club; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.club (id, name, address, registration_address, city, country, avatar, opening, closing, owner_id) FROM stdin;
1       Club1   addres  _       Omsk    Russia  https://api.mjton.com/padel_backend/api/v1.0/club/image/1_1_1.jpg       08:00   23:00   1
3       Boubana padel   Tangier _       Tangier Maroc   https://api.mjton.com/padel_backend/api/v1.0/club/image/default.png     08:00   23:00   3
2       TCMT    Tangier _       Tangier Maroc   https://api.mjton.com/padel_backend/api/v1.0/club/image/default.png     08:00   23:00   3
\.


--
-- Data for Name: clubphoto; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.clubphoto (id, photo, alt, photo_club_id) FROM stdin;
1       https://api.mjton.com/padel_backend/api/v1.0/club/image/1_1_8.jpg       image   1
2       https://api.mjton.com/padel_backend/api/v1.0/club/image/1_1_1.jpg       image   1
\.


--
-- Data for Name: clubs_bookmarks; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.clubs_bookmarks (user_id, club_id) FROM stdin;
4       2
4       3
3       2
3       3
1       1
1       2
\.


--
-- Data for Name: court; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.court (id, name, club_court_id) FROM stdin;
1       Court #1        1
2       Court #2        1
3       Court 1 2
4       Court 2 2
\.


--
-- Data for Name: friendrequest; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.friendrequest (id, recipient_user_id, sender_user_id) FROM stdin;
1       2       1
3       2       3
\.


--
-- Data for Name: friends_with_tag; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.friends_with_tag (tag_id, user_id) FROM stdin;
\.


--
-- Data for Name: match; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.match (id, status, start_at, end_at, created_at, text_user_1, text_user_2, text_user_3, text_user_4, match_lvl, first_team_score, second_team_score, is_private, club_id, owner>7       expectation     2024-08-20 08:30:00+00  2024-08-20 07:00:00+00  2024-08-19 09:32:03.563394+00   \N      \N      \N      \N      5.5-6.5 0       0       f       2       3       3  >1       expectation     2024-08-16 04:30:00+00  2024-08-16 03:00:00+00  2024-08-16 09:05:52.085785+00   \N      \N      \N      \N      2.5-3.5 8       7       f       1       1       1  >5       done    2024-08-22 03:30:00+00  2024-08-22 02:00:00+00  2024-08-18 08:02:13.528211+00   Test user       \N      \N      \N      2.5-3.5 5       8       f       1       1       1  >\.


COPY public.tag (id, name, tag_owner_id) FROM stdin;
1       Amis    3
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public."user" (id, first_name, last_name, username, avatar, age, email, telegram_user_id, "position", hand, status, city, country, lvl, is_first_open) FROM stdin;
5       Nateev  None    Natevvv https://api.mjton.com/padel_backend/api/v1.0/user/image/default.png     45      email@email.com 5097177190      right   left_hand       player  Tangier Mar>1       Sergey  Averin  PrettyStreet55  https://api.mjton.com/padel_backend/api/v1.0/user/image/339433633_TestPhoto.png 21      dfsser@mail.com 339433633       right   right_hand      sup>2       BLUE    None    obgblue https://api.mjton.com/padel_backend/api/v1.0/user/image/default.png     18      a@aa.aa 5754391597      both    left_hand       super_admin     Moscow  Rus>4       Didier  Israël  Immobilierisrael        https://api.mjton.com/padel_backend/api/v1.0/user/image/default.png     54      didieranidjar@gmail.com 5224427754      right   left_hand  >3       Didier  Anidjar Didier  https://api.mjton.com/padel_backend/api/v1.0/user/image/default.png     54      didieranidjar@gmail.com 1131389658      both    right_hand      super_admin>\.


--
-- Data for Name: user_for_match; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.user_for_match (match_id, user_id) FROM stdin;
\.


--
-- Data for Name: user_friends; Type: TABLE DATA; Schema: public; Owner: fastapi
--

COPY public.user_friends (user_rel_id, user_id) FROM stdin;
4       3
3       4
5       3
3       5
\.

