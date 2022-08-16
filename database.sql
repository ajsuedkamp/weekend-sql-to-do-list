CREATE TABLE "tasks" (
"id" serial primary key,
"task_description" varchar(100),
);

INSERT INTO "tasks" ("task_description")
VALUES ('Wash the dishes');

ALTER TABLE "tasks"
ADD COLUMN "complete" BOOLEAN default FALSE;

UPDATE "tasks" SET "complete" = TRUE
WHERE "id" = 1;


SELECT * FROM "tasks";