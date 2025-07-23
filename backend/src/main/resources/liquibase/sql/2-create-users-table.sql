CREATE TABLE blog.users (
    id              UUID DEFAULT gen_random_uuid() NOT NULL,
    username        VARCHAR(100) NOT NULL  UNIQUE ,
    password        VARCHAR(255) NOT NULL,
    firstName       VARCHAR(255),
    lastName        VARCHAR(255),
    email           VARCHAR(255) NOT NULL UNIQUE ,
    birthdate       TIMESTAMP,
    created_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date    TIMESTAMP,
    deleted_date    TIMESTAMP

);

DO $$
    BEGIN
        BEGIN
            ALTER TABLE blog.users ADD CONSTRAINT users_pk PRIMARY KEY (id);
        EXCEPTION
            WHEN others THEN  null;
        END;
END $$;