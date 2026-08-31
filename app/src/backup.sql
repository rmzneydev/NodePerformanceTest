--
-- PostgreSQL database dump
--

\restrict crGV2uPSjCYkUEWIp0PymySBj9mxzea2xTgXZgKcWycwiy7S5bg75lARousaf6n

-- Dumped from database version 15.19
-- Dumped by pg_dump version 15.19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_supply_requests_status; Type: TYPE; Schema: public; Owner: pg-bd-usr
--

CREATE TYPE public.enum_supply_requests_status AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'DISPATCHED',
    'DELIVERED',
    'CANCELLED'
);


ALTER TYPE public.enum_supply_requests_status OWNER TO "pg-bd-usr";

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: pg-bd-usr
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'manager'
);


ALTER TYPE public.enum_users_role OWNER TO "pg-bd-usr";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clinics; Type: TABLE; Schema: public; Owner: pg-bd-usr
--

CREATE TABLE public.clinics (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    nit character varying(50) NOT NULL,
    address character varying(255),
    phone character varying(30),
    responsible_user_id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.clinics OWNER TO "pg-bd-usr";

--
-- Name: clinics_id_seq; Type: SEQUENCE; Schema: public; Owner: pg-bd-usr
--

CREATE SEQUENCE public.clinics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clinics_id_seq OWNER TO "pg-bd-usr";

--
-- Name: clinics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg-bd-usr
--

ALTER SEQUENCE public.clinics_id_seq OWNED BY public.clinics.id;


--
-- Name: inventories; Type: TABLE; Schema: public; Owner: pg-bd-usr
--

CREATE TABLE public.inventories (
    id integer NOT NULL,
    warehouse_id integer NOT NULL,
    medicine_id integer NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.inventories OWNER TO "pg-bd-usr";

--
-- Name: inventories_id_seq; Type: SEQUENCE; Schema: public; Owner: pg-bd-usr
--

CREATE SEQUENCE public.inventories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventories_id_seq OWNER TO "pg-bd-usr";

--
-- Name: inventories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg-bd-usr
--

ALTER SEQUENCE public.inventories_id_seq OWNED BY public.inventories.id;


--
-- Name: medicines; Type: TABLE; Schema: public; Owner: pg-bd-usr
--

CREATE TABLE public.medicines (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    code character varying(50) NOT NULL,
    description text,
    manufacturer character varying(150),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.medicines OWNER TO "pg-bd-usr";

--
-- Name: medicines_id_seq; Type: SEQUENCE; Schema: public; Owner: pg-bd-usr
--

CREATE SEQUENCE public.medicines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medicines_id_seq OWNER TO "pg-bd-usr";

--
-- Name: medicines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg-bd-usr
--

ALTER SEQUENCE public.medicines_id_seq OWNED BY public.medicines.id;


--
-- Name: supply_requests; Type: TABLE; Schema: public; Owner: pg-bd-usr
--

CREATE TABLE public.supply_requests (
    id integer NOT NULL,
    clinic_id integer NOT NULL,
    warehouse_id integer NOT NULL,
    medicine_id integer NOT NULL,
    quantity integer NOT NULL,
    status public.enum_supply_requests_status DEFAULT 'PENDING'::public.enum_supply_requests_status NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.supply_requests OWNER TO "pg-bd-usr";

--
-- Name: supply_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: pg-bd-usr
--

CREATE SEQUENCE public.supply_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.supply_requests_id_seq OWNER TO "pg-bd-usr";

--
-- Name: supply_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg-bd-usr
--

ALTER SEQUENCE public.supply_requests_id_seq OWNED BY public.supply_requests.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: pg-bd-usr
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'manager'::public.enum_users_role NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO "pg-bd-usr";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: pg-bd-usr
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "pg-bd-usr";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg-bd-usr
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: warehouses; Type: TABLE; Schema: public; Owner: pg-bd-usr
--

CREATE TABLE public.warehouses (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    location character varying(150) NOT NULL,
    address character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.warehouses OWNER TO "pg-bd-usr";

--
-- Name: warehouses_id_seq; Type: SEQUENCE; Schema: public; Owner: pg-bd-usr
--

CREATE SEQUENCE public.warehouses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.warehouses_id_seq OWNER TO "pg-bd-usr";

--
-- Name: warehouses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg-bd-usr
--

ALTER SEQUENCE public.warehouses_id_seq OWNED BY public.warehouses.id;


--
-- Name: clinics id; Type: DEFAULT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.clinics ALTER COLUMN id SET DEFAULT nextval('public.clinics_id_seq'::regclass);


--
-- Name: inventories id; Type: DEFAULT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.inventories ALTER COLUMN id SET DEFAULT nextval('public.inventories_id_seq'::regclass);


--
-- Name: medicines id; Type: DEFAULT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.medicines ALTER COLUMN id SET DEFAULT nextval('public.medicines_id_seq'::regclass);


--
-- Name: supply_requests id; Type: DEFAULT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.supply_requests ALTER COLUMN id SET DEFAULT nextval('public.supply_requests_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: warehouses id; Type: DEFAULT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.warehouses ALTER COLUMN id SET DEFAULT nextval('public.warehouses_id_seq'::regclass);


--
-- Data for Name: clinics; Type: TABLE DATA; Schema: public; Owner: pg-bd-usr
--

COPY public.clinics (id, name, nit, address, phone, responsible_user_id, is_active, created_at, updated_at) FROM stdin;
1	Clínica Central	900123456-1	Calle 50 #45-12	3101234567	2	t	2026-08-31 16:57:58.033+00	2026-08-31 16:57:58.033+00
2	Clínica del Norte	900234567-2	Carrera 20 #80-30	3202345678	2	t	2026-08-31 16:57:58.037+00	2026-08-31 16:57:58.037+00
\.


--
-- Data for Name: inventories; Type: TABLE DATA; Schema: public; Owner: pg-bd-usr
--

COPY public.inventories (id, warehouse_id, medicine_id, stock, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: medicines; Type: TABLE DATA; Schema: public; Owner: pg-bd-usr
--

COPY public.medicines (id, name, code, description, manufacturer, is_active, created_at, updated_at) FROM stdin;
1	Acetaminofén	MED-001	Analgésico	Genfar	t	2026-08-31 16:57:58.047+00	2026-08-31 16:57:58.047+00
2	Ibuprofeno	MED-002	Antiinflamatorio	Procaps	t	2026-08-31 16:57:58.05+00	2026-08-31 16:57:58.05+00
\.


--
-- Data for Name: supply_requests; Type: TABLE DATA; Schema: public; Owner: pg-bd-usr
--

COPY public.supply_requests (id, clinic_id, warehouse_id, medicine_id, quantity, status, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: pg-bd-usr
--

COPY public.users (id, name, email, password, role, is_active, created_at, updated_at) FROM stdin;
1	Admin	admin@example.com	$2b$10$LPYeqwprtPnQvCSg4pxVXeuy7NZfJzDRLOZYDYPZjROuH7dqK5qRq	admin	t	2026-08-31 16:57:57.927+00	2026-08-31 16:57:57.927+00
2	User Demo	user@example.com	$2b$10$70uF5sC.gox6FRYRzImvKuWk5OO9VNJyWt1KlMC/unGoRqCfYEuju	manager	t	2026-08-31 16:57:57.983+00	2026-08-31 16:57:57.983+00
\.


--
-- Data for Name: warehouses; Type: TABLE DATA; Schema: public; Owner: pg-bd-usr
--

COPY public.warehouses (id, name, location, address, is_active, created_at, updated_at) FROM stdin;
1	Bodega Norte	Medellín	Calle 50 #10	t	2026-08-31 16:57:58.041+00	2026-08-31 16:57:58.041+00
2	Bodega Sur	Cali	Carrera 30 #20	t	2026-08-31 16:57:58.044+00	2026-08-31 16:57:58.044+00
\.


--
-- Name: clinics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pg-bd-usr
--

SELECT pg_catalog.setval('public.clinics_id_seq', 2, true);


--
-- Name: inventories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pg-bd-usr
--

SELECT pg_catalog.setval('public.inventories_id_seq', 1, false);


--
-- Name: medicines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pg-bd-usr
--

SELECT pg_catalog.setval('public.medicines_id_seq', 2, true);


--
-- Name: supply_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pg-bd-usr
--

SELECT pg_catalog.setval('public.supply_requests_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pg-bd-usr
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: warehouses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pg-bd-usr
--

SELECT pg_catalog.setval('public.warehouses_id_seq', 2, true);


--
-- Name: clinics clinics_nit_key; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_nit_key UNIQUE (nit);


--
-- Name: clinics clinics_pkey; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_pkey PRIMARY KEY (id);


--
-- Name: inventories inventories_pkey; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT inventories_pkey PRIMARY KEY (id);


--
-- Name: medicines medicines_code_key; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.medicines
    ADD CONSTRAINT medicines_code_key UNIQUE (code);


--
-- Name: medicines medicines_pkey; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.medicines
    ADD CONSTRAINT medicines_pkey PRIMARY KEY (id);


--
-- Name: supply_requests supply_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.supply_requests
    ADD CONSTRAINT supply_requests_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (id);


--
-- Name: uq_inventory_warehouse_medicine; Type: INDEX; Schema: public; Owner: pg-bd-usr
--

CREATE UNIQUE INDEX uq_inventory_warehouse_medicine ON public.inventories USING btree (warehouse_id, medicine_id);


--
-- Name: clinics clinics_responsible_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT clinics_responsible_user_id_fkey FOREIGN KEY (responsible_user_id) REFERENCES public.users(id);


--
-- Name: inventories inventories_medicine_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT inventories_medicine_id_fkey FOREIGN KEY (medicine_id) REFERENCES public.medicines(id);


--
-- Name: inventories inventories_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT inventories_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id);


--
-- Name: supply_requests supply_requests_clinic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.supply_requests
    ADD CONSTRAINT supply_requests_clinic_id_fkey FOREIGN KEY (clinic_id) REFERENCES public.clinics(id);


--
-- Name: supply_requests supply_requests_medicine_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.supply_requests
    ADD CONSTRAINT supply_requests_medicine_id_fkey FOREIGN KEY (medicine_id) REFERENCES public.medicines(id);


--
-- Name: supply_requests supply_requests_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pg-bd-usr
--

ALTER TABLE ONLY public.supply_requests
    ADD CONSTRAINT supply_requests_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id);


--
-- PostgreSQL database dump complete
--

\unrestrict crGV2uPSjCYkUEWIp0PymySBj9mxzea2xTgXZgKcWycwiy7S5bg75lARousaf6n

