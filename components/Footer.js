import Image from "next/image";

import { FaLinkedin, FaGithub, FaYoutube, FaRocket } from "react-icons/fa";
import Button from "./Button";

export default function Footer() {
  const navigation = {
    solutions: [
      { name: "Search", href: "/search" },
      { name: "Events", href: "/events" },
      { name: "Map", href: "/map" },
      { name: "Premium", href: "/premium" },
      { name: "Login", href: "/auth/signin" },
    ],
    support: [
      { name: "QuickStart", href: "/docs/quickstart" },
      { name: "Updating your profile", href: "/docs/how-to-guides/editing" },
      { name: "Json Playground", href: "/playground" },
      {
        name: "Contributing Guide",
        href: "https://github.com/EddieHubCommunity/LinkFree/blob/main/CONTRIBUTING.md",
      },
      { name: "Feature Changelog", href: "/changelog" },
    ],
    community: [
      {
        name: "EddieHub GitHub Org",
        href: "https://github.com/EddieHubCommunity",
      },
      {
        name: "Maintainers",
        href: "https://github.com/orgs/EddieHubCommunity/teams/linkfree/members",
      },
      { name: "Resources", href: "/docs/community-resources" },
      {
        name: "Contributors",
        href: "https://github.com/EddieHubCommunity/LinkFree/graphs/contributors",
      },
    ],
    legal: [
      {
        name: "License",
        href: "https://github.com/EddieHubCommunity/LinkFree/blob/main/LICENSE",
      },
      { name: "Terms", href: "/terms" },
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/linkfree.eddiehub/",
        icon: FaLinkedin,
      },
      {
        name: "GitHub",
        href: "https://github.com/EddieHubCommunity/LinkFree",
        icon: FaGithub,
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/watch?v=05HEeCQSKRE&list=PL4lTrYcDuAfyU0fJcCGLm5r-hM_rqXaxd",
        icon: FaYoutube,
      },
    ],
  };

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <Image
            width={100}
            height={100}
            src="/logo512.png"
            alt="LinkFree logo"
          />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Community
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.community.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1 text-center lg:text-left pb-4 lg:pb-0">
            <h3 className="font-semibold leading-6 text-white">
              Subscribe to learn more about future Premium Paid Features
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              LinkFree will always be 100% Open Source and have a free tier.
            </p>
          </div>
          <Button
            text="Learn more about Premium"
            primary={true}
            icon={<FaRocket />}
            href="/premium"
          />
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            100% Open Source on GitHub
          </p>
        </div>
      </div>
    </footer>
  );
}
