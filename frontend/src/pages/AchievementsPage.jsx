import Achievements from '../components/Achievements';

export default function AchievementsPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <Achievements preview={false} />
    </div>
  );
}
