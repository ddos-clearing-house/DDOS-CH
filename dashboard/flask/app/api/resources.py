from flask_restful import Resource, reqparse
import asyncio
import os


async def command(cmd):
    """
    Execute a command on the system asynchronously
    """
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE)

    # # Wait for the script to complete and print its outputs. (for testing purposes)
    # stdout, stderr = await proc.communicate()
    #
    # print(f'[{cmd!r} exited with {proc.returncode}]')
    # if stdout:
    #     print(f'[stdout]\n{stdout.decode()}')
    # if stderr:
    #     print(f'[stderr]\n{stderr.decode()}')


class Start(Resource):
    @staticmethod
    def post(partner: str):
        if partner not in os.getenv('PARTNERS').split(':'):
            return {'Error': f'partner {partner} is not in the list of partners in this pilot.'}, 400

        parser = reqparse.RequestParser()
        parser.add_argument('attack', choices=['frag', 'syn', 'udp', 'tcp'], required=True)
        parser.add_argument('duration', type=int, required=True)
        parser.add_argument('port', type=int, required=True)
        parser.add_argument('speed', choices=['u100000', 'u10000', 'u1000', 'u100', 'u10', 'u1', 'u0'],
                            required=True)
        args = parser.parse_args()

        if type(args.duration) != int or args.duration > 300 or args.duration < 1:
            return {'Error': 'Duration must be a positive integer under 300.'}, 400

        if type(args.port) != int or args.port < 1 or args.port > 65535:
            return {'Error': 'Duration must be a positive integer under 300.'}, 400

        hping_flags = {
            # Read data from /etc/services, send packets with 1 byte of data, frag
            'tcp': '',
            'frag': '--frag -d 1',
            'syn': '-S',  # enable SYN flag
            'udp': '--udp',  # Use UDP protocol
        }
        try:
            instructions = f'/bin/bash /attacks/entrypoint "{hping_flags[args.attack]}" {partner} {args.duration} ' \
                           f'{args.port} {args.speed}'
            print(instructions)
            asyncio.run(command(instructions))
        except KeyError:
            return {'Error': 'Invalid attack type.'}, 400

        return {'message': f'Started hping3 with flags {hping_flags[args.attack]}!'}, 200


class Stop(Resource):
    @staticmethod
    def post(partner: str):
        if partner not in os.getenv('PARTNERS').split(':'):
            return {'error': f'partner {partner} is not in the list of partners in this pilot.'}, 400

        asyncio.run(command("/bin/bash /attacks/stop"))
        return {'message': f'Stopped!'}, 200
