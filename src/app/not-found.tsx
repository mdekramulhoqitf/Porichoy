import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-paper pt-24">
      <div className="shell text-center">
        <p className="eyebrow text-steel">404</p>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,7rem)]">Nothing here yet.</h1>
        <p className="mx-auto mt-6 max-w-md text-steel">This page doesn&apos;t exist. The work does.</p>
        <div className="mt-10 flex justify-center">
          <Button href="/#work">See the work</Button>
        </div>
      </div>
    </section>
  );
}
