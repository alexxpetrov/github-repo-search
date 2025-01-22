import type { IRepoIssues, IRepoPulls } from '@/internal/services/github';
import { useQueryParams } from '@/internal/hooks/useQueryParams';
import { formatIssueDate } from '@/internal/lib/date/date';
import { FilterType } from '@/internal/types';
import { ChatBubbleLeftEllipsisIcon, CheckCircleIcon, CodeBracketIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared-components/ui/card';

export const Issue = ({ issue }: { issue: IRepoIssues['data'][0] | IRepoPulls['data'][0] }) => {
  const { state } = useQueryParams();
  const formattedDate = formatIssueDate(issue.created_at);

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        {/* @ts-expect-error PR type doesn't include 'pull_request' key */}
        {(state === FilterType.PR || issue.pull_request)
          ? (
              <span className="flex items-center gap-1 text-indigo-600">
                <CodeBracketIcon className="size-5" />
                <span>
                  Pull Request
                </span>
              </span>
            )
          : (
              <span className="flex items-center gap-1 text-slate-600">
                <ChatBubbleLeftEllipsisIcon className="size-5" />
                <span>
                  Issue
                </span>
              </span>
            )}
        {issue.state === FilterType.CLOSED
          ? (
              <div className="flex items-center gap-1 text-red-600">
                <ExclamationCircleIcon className="size-5" />
                <span>Closed</span>
              </div>
            )
          : (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircleIcon className="size-5" />
                <span>Open</span>
              </div>
            )}
        <CardTitle>
          <Link
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            <p className="break-all">
              {issue.title}
            </p>
          </Link>

        </CardTitle>

      </CardHeader>
      <CardContent>
        Issue #
        {issue.number}
        {' '}
        opened at
        {' '}
        {formattedDate}
        {' '}
        by
        {' '}
        {issue.user?.login}
      </CardContent>
    </Card>
  );
};
