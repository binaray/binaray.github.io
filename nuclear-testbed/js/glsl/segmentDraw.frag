in vec2 particleIndex;

uniform sampler2D particlesSpeed;
uniform float maxMagnitude;

out vec4 outputColor;


float hump(float mag) {
	int i = 0;
	float g = 2.0 * mag;
	if (g >= 1.0)
		g = 2.0-g;
	return g;
}

void main() {
	vec3 speed = texture(particlesSpeed, particleIndex).rgb;
	float magnitude = length(speed)/maxMagnitude;

	outputColor = vec4(magnitude, hump(magnitude), 1.0-magnitude, 1.0);
    //const vec4 white = vec4(1.0);
    //outputColor = white;
}