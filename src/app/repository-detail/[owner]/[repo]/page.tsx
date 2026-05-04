import { RepositoryDetailPage } from "@/components/RepositoryDetailPage/RepositoryDetailPage";

type PageProps = {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
  searchParams?: {
    search?: string;
    page?: string;
  };
};

export default async function RepositoryDetailRoutePage({ params }: PageProps) {
  const { owner, repo } = await params;

  return <RepositoryDetailPage owner={owner} repo={repo} />;
}
