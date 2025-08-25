import { useAuthSelectors } from '../../../auth/store/auth.selectors';
import { WorkingHoursForm } from '../components/WorkingHoursForm';

export const WorkingHours = () => {
  const { user } = useAuthSelectors();

  return <WorkingHoursForm data={user?.workingHours} />;
};
