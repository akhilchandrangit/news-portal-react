import { useQuery } from 'react-query';
import { getSections } from '../../services/NewsService';

interface Props {
  onClick: (section: string) => void;
}

const Sections: React.FC<Props> = ({ onClick }) => {
  const { data, isLoading } = useQuery('sections', getSections);

  return (
    <div className="py-4 artboard artboard-demo bg-base-200">
      <h2 className="font-bold">Sections</h2>
      {isLoading && 'loading....'}
      <ul
        className="menu p-4 shadow-lg rounded-box w-full"
        style={{ height: '100vh', overflow: 'auto' }}
      >
        {data?.data?.results?.map((section: any) => (
          <li
            className="cursor-pointer text-sm"
            key={section.section}
            onClick={() => onClick(section.section)}
          >
            <span className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              {section.display_name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sections;
