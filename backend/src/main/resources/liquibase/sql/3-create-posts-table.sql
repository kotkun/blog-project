CREATE TABLE blog.posts (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    u_id UUID,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP,
    deleted_date TIMESTAMP
);


    ALTER TABLE blog.posts ADD CONSTRAINT posts_pk PRIMARY KEY (id);

    CREATE INDEX IF NOT EXISTS user_fk_ix ON blog.posts (u_id);

    ALTER TABLE blog.posts
        ADD CONSTRAINT user_fk
            FOREIGN KEY (u_id)
                REFERENCES blog.users (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION
