import code

from website.app import get_app

def main():
    app = get_app()

    code.InteractiveConsole().interact("""
        Wassup it's da console!
    """.strip())


if __name__ == '__main__':
    main()
