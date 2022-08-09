import { ClientOnly } from "remix-utils";
import LinkedinLogo from "../../assets/images/linkedin.svg";
import GithubLogo from "../../assets/images/github.svg";
import TwitterLogo from "../../assets/images/twitter.svg";
import BlogLogo from "../../assets/images/blog.svg";
import Profile from "../../assets/images/profile.webp";
import { Link } from "@remix-run/react";

import ColorSegment from "~/components/ColorSegment";

export default function Index() {
  return (
    <div className={"h-screen w-screen bg-black"}>
      <main
        className={
          "flex h-full flex-col items-center justify-center gap-12 pr-6 pl-6"
        }
      >
        <section className={"flex flex-col items-center justify-center"}>
          <img
            className={"w-50 h-52 rounded-full"}
            src={Profile}
            alt={"profile"}
          />
        </section>
        <section className={"flex flex-col items-center justify-center gap-10"}>
          <h1 className="font-mono text-2xl text-white md:text-4xl ">
            Read,Think and Code
          </h1>
          <h2 className={"text-2xl text-white md:text-3xl"}>Hongfang Li</h2>
        </section>
        <section className={"z-10 flex gap-20"}>
          <Link to="./blog" prefetch={"intent"}>
            <img src={BlogLogo} className={"h-12 w-12"} alt={"blog"} />
          </Link>
        </section>

        <ClientOnly fallback={<p>Loading...</p>}>
          {() => <ColorSegment />}
        </ClientOnly>
      </main>
    </div>
  );
}
