CREATE TABLE blog.posts (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    u_id UUID DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP,
    deleted_date TIMESTAMP
);

DO $$
    BEGIN
        BEGIN
            ALTER TABLE blog.posts ADD CONSTRAINT posts_pk PRIMARY KEY (id);
        EXCEPTION
            WHEN others THEN  null;
        END;
END $$;