import './header.css'

const Header = () => {
    const PF = "https://elsamreactblog.herokuapp.com/images/"
    return (
        <div className='header'>
            <div className="header-titles">
                <span className="header-titleSm">React & Node</span>
                <span className="header-titleLg">Blog</span>
            </div>
            <img src={`${PF}flower.avif`} alt="" className="header-img" />
        </div>
    );
};

export default Header;