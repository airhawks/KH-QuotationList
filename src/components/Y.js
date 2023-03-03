function Y() {
  return (
    <div className="row pt-4">
      <div className="col-2 my-auto mr-3">
        <img
          src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png"
          width="70px"
          alt=""
        />
      </div>
      <div className="col">
        <p>
          <strong>The Practical Dev</strong>
          <a href="/">
            <strong className="font-weight-light small">
              {" "}
              @ThePracticalDev
            </strong>
          </a>
          <strong className="text-highlight font-weight-light small">
            {" "}
            • Sep 10
          </strong>
        </p>
        <p>Learning React? Start Small.</p>
        <p>{"Author: @dceddia"}</p>
      </div>
    </div>
  );
}

export default Y;
