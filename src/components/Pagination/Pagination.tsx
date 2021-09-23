import { getPaginationItems } from '../../lib/utility';

interface Props {
  page: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
  onClick: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  page,
  total,
  onNext,
  onPrevious,
  onClick,
}) => {
  return (
    <div className="btn-group">
      <button className="btn" onClick={onPrevious}>
        Previous
      </button>
      {getPaginationItems(page, total).map((item, index) => (
        <button
          onClick={() => onClick(item)}
          key={index}
          className={`btn ${item === page && 'btn-active'}`}
        >
          {item}
        </button>
      ))}
      <button className="btn" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
