import { useEffect, useState } from 'react';
import {
  useUnreviewedSubmissionsQuery,
  useReviewedSubmissionsQuery,
  useUpdateUserProfileMutation,
  useUserProfileByUserIdQuery,
} from '../../hooks/user-profile';
import { USER_PROFILE_STATUS, USER_ROLE } from '../../constant/user';
import ConfirmDialog from '../../components/confirm-dialog';
import Button from '../../components/button';
import { useAuthContext } from '../../hooks/use-auth-context';

const statuses = [
  {
    text: 'Pending',
    backgroundColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  {
    text: 'Approved',
    backgroundColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    text: 'Rejected',
    backgroundColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
];

const filters = [
  {
    key: 'unreviewed',
    text: 'Unreviewed',
    filterValue: 'unreviewed',
  },
  {
    key: 'reviewed',
    text: 'Reviewed',
    filterValue: 'reviewed',
  },
];

const Submissions = () => {
  const [filter, setFilter] = useState('unreviewed');
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuthContext();
  const isNormalUser = user.role === USER_ROLE.NORMAL_USER;

  const mySubmisson = useUserProfileByUserIdQuery('udP6zDJ');
  const unreviewedQuery = useUnreviewedSubmissionsQuery();
  const reviewedQuery = useReviewedSubmissionsQuery();

  const { mutateAsync: updateUserProfile } = useUpdateUserProfileMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    if (isNormalUser && mySubmisson.data?.data) {
      setSubmissions(mySubmisson.data.data);
    } else if (
      !isNormalUser &&
      filter === 'unreviewed' &&
      unreviewedQuery.data?.data
    ) {
      setSubmissions(unreviewedQuery.data.data);
    } else if (
      !isNormalUser &&
      filter === 'reviewed' &&
      reviewedQuery.data?.data
    ) {
      setSubmissions(reviewedQuery.data.data);
    }
  }, [filter, unreviewedQuery.data, reviewedQuery.data]);

  const openDialog = (submission, action) => {
    setSelectedSubmission(submission);
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    const updated = { ...selectedSubmission };

    if (selectedAction === 'approve') {
      updated.status = USER_PROFILE_STATUS.APPROVED;
    } else if (selectedAction === 'reject') {
      updated.status = USER_PROFILE_STATUS.REJECT;
    }

    await updateUserProfile({
      id: updated.id,
      data: updated,
    });

    setDialogOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold text-center mb-6"
        style={{ color: 'var(--primary-color)' }}
      >
        {isNormalUser ? 'My Submission' : 'KYC Submissions'}
      </h2>

      {!isNormalUser && (
        <div className="flex gap-2 mb-4">
          {filters.map((item) => {
            return (
              <Button
                key={item.key}
                handleClick={() => setFilter(item.filterValue)}
              >
                {item.text}
              </Button>
            );
          })}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              {!isNormalUser && filter === 'unreviewed' && (
                <th className="px-6 py-3 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => {
              const status = statuses[submission.status];

              return (
                <tr key={submission.id} className="border-b border-gray-200">
                  <td className="px-6 py-4">
                    {`${submission.firstName} ${submission.middleName} ${submission.lastName}`}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${status.backgroundColor} ${status.textColor}`}
                    >
                      {status.text}
                    </span>
                  </td>

                  <td className="px-6 py-4">{submission.submitDate}</td>

                  {!isNormalUser && filter === 'unreviewed' && (
                    <td className="px-6 py-4 flex gap-2 justify-end">
                      <button
                        className="px-4 py-1 text-green-800 font-medium border border-green-400 rounded-md 
                        hover:bg-green-50 transition cursor-pointer"
                        onClick={() => openDialog(submission, 'approve')}
                      >
                        Approve
                      </button>

                      <button
                        className="px-4 py-1 text-red-800 font-medium border border-red-400 rounded-md 
                        hover:bg-red-50 transition cursor-pointer"
                        onClick={() => openDialog(submission, 'reject')}
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        message={
          selectedAction === 'approve'
            ? 'Are you sure you want to approve this submission?'
            : 'Are you sure you want to reject this submission?'
        }
      />
    </div>
  );
};

export default Submissions;
