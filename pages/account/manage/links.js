import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";
import { useRouter } from "next/router";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/navigation";
import { getLinksApi } from "pages/api/account/manage/links";
import Button from "@components/Button";
import UserLinks from "@components/user/UserLinks";
import Alert from "@components/Alert";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const username = session.username;

  let links = [];
  try {
    links = await getLinksApi(username);
  } catch (e) {
    logger.error(e, `profile loading failed links for username: ${username}`);
  }

  return {
    props: { username, links, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ManageLinks({ BASE_URL, username, links }) {
  const router = useRouter();
  const { success } = router.query;

  return (
    <>
      <PageHead
        title="Manage Links"
        description="Here you can manage your LinkFree links"
      />

      <Page>
        {success && (
          <Alert type="success" message="Link Created/Updated Successfully" />
        )}
        <Navigation />

        <Button href="/account/manage/link">
          <DocumentPlusIcon className="h-5 w-5 mr-2" />
          Add Link
        </Button>

        <UserLinks
          links={links}
          username={username}
          BASE_URL={BASE_URL}
          manage={true}
        />
      </Page>
    </>
  );
}
