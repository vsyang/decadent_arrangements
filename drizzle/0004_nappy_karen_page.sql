CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"size" "product_size" NOT NULL,
	"image_url" text NOT NULL,
	"pathname" text NOT NULL,
	"file_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_images_pathname_unique" UNIQUE("pathname")
);
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_preference" text DEFAULT 'venmo' NOT NULL;