const Content = () => {
  <div className={styles['engagement-category__wrapper']}>
    {isLoading &&
      [...Array(COUNT_SKELETON)].map((_, index) => <Skeleton key={index} />)}
    {!isLoading &&
      data.map((item, index) => {
        return (
          <Card
            title={item.name}
            percent={item.percent}
            color='black'
            key={index}
          />
        );
      })}
    {/* <Card title='Движущая сила' percent={1} color='black' />
  <Card title='Ослабленные' percent={2} color='purple' />
  <Card title='Мученики' percent={4} color='blue' />
  <Card title='Балласт' percent={5} color='red' />
  <Card title='Будущий потенциал' percent={10} color='pink' />
  <Card title='Мысленно уже не в компании' percent={50} color='orange' /> */}
  </div>;
};

export default Content;
