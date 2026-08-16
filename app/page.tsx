import Link from "next/link";
import { ArrowRight, Kanban, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main>
      <section className="container mx-auto px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <Badge className="mb-6">
              ✨ Modern Kanban App
            </Badge>

            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              Organize your work,
              <br />
              one task at a time.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              TaskFlow is a modern Kanban application built with
              Next.js, TypeScript, Shadcn UI, PostgreSQL and Prisma.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg">
                <Link
                  href="https://github.com/Elashf"
                  target="_blank"
                >
                  GitHub
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-xl">
            <div className="aspect-video rounded-xl border bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">
                Dashboard Preview
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <Zap className="mb-4 text-primary" />

            <h3 className="mb-2 text-xl font-semibold">
              Fast
            </h3>

            <p className="text-muted-foreground">
              Built with Next.js App Router for maximum performance.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <Kanban className="mb-4 text-primary" />

            <h3 className="mb-2 text-xl font-semibold">
              Modern UI
            </h3>

            <p className="text-muted-foreground">
              Beautiful interface powered by Shadcn UI &
              Tailwind CSS.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <ShieldCheck className="mb-4 text-primary" />

            <h3 className="mb-2 text-xl font-semibold">
              Secure
            </h3>

            <p className="text-muted-foreground">
              Authentication, Roles and Permissions.
            </p>
          </div>

        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Tech Stack
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">Shadcn UI</Badge>
          <Badge variant="secondary">Redux Toolkit</Badge>
          <Badge variant="secondary">Prisma</Badge>
          <Badge variant="secondary">PostgreSQL</Badge>
        </div>
      </section>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 TaskFlow. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link
              href="https://github.com/Elashf"
              target="_blank"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}