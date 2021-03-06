import React, { forwardRef, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import List from 'components/Molecules/List/List';
import ListElement from 'components/Atoms/ListElement/ListElement';
import ReturnButton from 'components/Atoms/ReturnButton/ReturnButton';
import ListHeadline from 'components/Molecules/ListHeadline/ListHeadline';
import ListParagraph from 'components/Molecules/ListParagraph/ListParagraph';
import StyledThirdTile from './ThirdTile.styled';
// import Tile from '../Tile';

const ThirdTile = forwardRef(({ isActive, type, setThirdActivity, storeData, thirdDataId }, ref) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (type === 'lists' && storeData.lists.active?.find(list => list.id === thirdDataId))
      setData(storeData.lists.active?.find(list => list.id === thirdDataId));
    else if (type === 'lists') setData(storeData.lists.archived?.find(list => list.id === thirdDataId));
    if (type === 'notes') setData(storeData.notes.active?.find(list => list.id === thirdDataId));
  }, [storeData, thirdDataId]);

  return (
    <StyledThirdTile isActive={isActive} ref={ref}>
      {type === 'notes' && data && (
        <>
          <ListHeadline className="third__headline" type="note" setThirdActivity={setThirdActivity}>
            {data && data.title}
          </ListHeadline>
          {data && (
            <ListParagraph id={data.id} title={data.title}>
              {data.content}
            </ListParagraph>
          )}
        </>
      )}

      {type === 'lists' && data && (
        <>
          <ListHeadline className="third__headline" type="todo" setThirdActivity={setThirdActivity}>
            {data.title}
          </ListHeadline>
          <div className="third__list-container">
            <List className="third__active-list">
              {data.todos?.map(item => (
                <ListElement key={item} type="uncompleted-task" className="uncompleted-task" id={data.id}>
                  <button type="button">{item}</button>
                </ListElement>
              ))}
              <ListElement className="third__add-button" type="add-button" id={data.id}>
                <button type="button">dodaj nowe zadanie</button>
              </ListElement>
            </List>

            <List className="third__archived-list">
              {data.completed?.map(item => (
                <ListElement key={item} type="completed-task" id={data.id} isCompletedTodo>
                  <button type="button">{item}</button>
                </ListElement>
              ))}
            </List>
          </div>
        </>
      )}
      <ReturnButton onClick={() => setThirdActivity(false)} />
    </StyledThirdTile>
  );
});

ThirdTile.displayName = 'SecondaryTile';

ThirdTile.propTypes = {
  isActive: propTypes.bool.isRequired,
  storeData: propTypes.shape(propTypes.oneOfType([propTypes.shape, propTypes.string])),
  type: propTypes.string.isRequired,
  setThirdActivity: propTypes.func.isRequired,
  thirdDataId: propTypes.string,
};

ThirdTile.defaultProps = {
  storeData: undefined,
  thirdDataId: undefined,
};

// export default Tile(ThirdTile);
export default ThirdTile;
